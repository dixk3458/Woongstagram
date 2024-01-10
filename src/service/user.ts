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
    email: email,
    image: image,
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
    ? `&& (userid match "${keyword}") || (username match "${keyword}")`
    : '';
  return client.fetch(`*[_type == "user" ${query}]{
    ...,
    "following":count(following),
    "followers":count(followers),
  }`);
}
