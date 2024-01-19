import { SearchedUser } from '@/model/user';
import { client } from './sanity';

type OAuthUser = {
  id: string;
  userid: string;
  name: string;
  email: string;
  image?: string | null;
};

// 처음 로그인을 한 사용자를 Sanity에 추가해주는것이다.
// 즉 서버측에서 로그인에 성공하면 Sanity에 요청
export async function addUser({ id, userid, name, email, image }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    userid: userid,
    username: name,
    image: image,
    email: email,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByUserId(userid: string) {
  return client.fetch(
    `*[_type == "user" && userid == "${userid}"][0]{
      ...,
      "id":_id,
      "following":following[]->{userid,image},
      "followers":followers[]->{userid,image},
      "bookmarks":bookmarks[]->_id,
    }
  `
  );
}

export async function searchUser(keyword?: string) {
  const query = keyword
    ? `&& (userid match "${keyword}*") || (username match "${keyword}*")`
    : '';
  return client
    .fetch(
      `*[_type == "user" ${query}]{
    ...,
    "userimage":image,
    "following":count(following),
    "followers":count(followers),
  }`
    )
    .then(users =>
      users.map((user: SearchedUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}

// 쿼리 요청을 할때 효율적인 방법을 고민하자.
// 조인과 projection을 이용해 서버에 요청을 효율적으로 해 , 자원을 적게 사용할수있다.
export async function getUserForProfile(userid: string) {
  return client
    .fetch(
      `*[_type == "user" && userid == "${userid}"][0]{
    ...,
    "usertokenid":_id,
    "userimage":image,
    "following":count(following),
    "followers":count(followers),
    "posts":count(*[_type == "post" && author->userid == "${userid}"])
  }`,
      undefined,
      {
        next: { tags: [`profile/${userid}`] },
      }
    )
    .then(user => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
      posts: user.posts ?? 0,
    }));
}

export async function addBookmark(usertokenid: string, postid: string) {
  // userid와 postid를 전달받아서
  // Sanity의 user 스키마에 접근해 추가를 한다.

  return client
    .patch(usertokenid)
    .setIfMissing({ bookmarks: [] })
    .append('bookmarks', [
      {
        _ref: postid,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(usertokenid: string, postid: string) {
  return client
    .patch(usertokenid)
    .unset([`bookmarks[_ref =="${postid}"]`])
    .commit();
}

export async function follow(myId: string, targetId: string) {
  return client
    .transaction() //
    .patch(myId, user =>
      user //
        .setIfMissing({ following: [] }) //
        .append('following', [{ _ref: targetId, _type: 'reference' }])
    )
    .patch(targetId, user =>
      user //
        .setIfMissing({ followers: [] })
        .append('followers', [
          {
            _ref: myId,
            _type: 'reference',
          },
        ])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(myId: string, targetId: string) {
  return client
    .transaction()
    .patch(myId, user => user.unset([`following[_ref == "${targetId}"]`])) //
    .patch(targetId, user => user.unset([`followers[_ref == "${myId}"]`]))
    .commit({ autoGenerateArrayKeys: true });
}
