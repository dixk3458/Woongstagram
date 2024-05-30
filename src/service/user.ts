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
