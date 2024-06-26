import { AuthUser, ProfileUser, SearchUser } from '@/model/user';
import { client } from './sanity';

export async function addUser({ id, name, userName, email, image }: AuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    name: name,
    userName: userName,
    email: email,
    image: image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByUserName(userName: string) {
  return client.fetch(
    `*[_type == 'user' && userName == "${userName}"][0]{
      ...,
      "id":_id,
      "following":following[]->{userName,image},
      "followers":followers[]->{userName,image},
      "bookmarks":bookmarks[]->_id
    }`
  );
}

export async function searchUsers(keyword?: string | null) {
  const query = keyword
    ? `&& userName match "${keyword}*" || name match "${keyword}*"`
    : '';
  return client
    .fetch(
      `*[_type == "user" ${query}]{
      ...,
      "following":count(following),
      "followers":count(followers)
    }`
    )
    .then(users =>
      users.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}

export async function getUserForProfile(userName: string) {
  return client
    .fetch(
      `*[_type == "user" && userName == "${userName}"][0]{
      ...,
      "id":_id,
      "createdAt":_createdAt,
      "following":count(following),
      "followers":count(followers),
      "posts":count(*[_type == "post" && author->userName == "${userName}"])
    }`,
      undefined,
      { next: { tags: [`profile/${userName}`] } }
    )
    .then(user => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
      posts: user.posts ?? 0,
    }));
}

export async function addBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .setIfMissing({ bookmarks: [] })
    .append('bookmarks', [
      {
        _ref: postId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref == "${postId}"]`])
    .commit();
}

export async function follow(myId: string, targetId: string) {
  return client
    .transaction() //
    .patch(myId, user =>
      user
        .setIfMissing({ following: [] })
        .append('following', [{ _ref: targetId, _type: 'reference' }])
    )
    .patch(targetId, user =>
      user
        .setIfMissing({ followers: [] })
        .append('followers', [{ _ref: myId, _type: 'reference' }])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(myId: string, targetId: string) {
  return client
    .transaction() //
    .patch(myId, user => user.unset([`following[_ref == "${targetId}"]`]))
    .patch(targetId, user => user.unset([`followers[_ref == "${myId}"]`]))
    .commit();
}
