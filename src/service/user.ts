import { ProfileUser, SearchUser } from '@/model/user';
import { client } from './sanity';

type OAuthUser = {
  id: string;
  name: string;
  userName: string;
  email: string;
  image?: string | null;
};

export async function addUser({ id, name, userName, email, image }: OAuthUser) {
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
      "following":count(following),
      "followers":count(followers),
      "posts":count(*[_type == "post" && author->userName == "${userName}"])
    }`
    )
    .then(user => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
      posts: user.posts ?? 0,
    }));
}
