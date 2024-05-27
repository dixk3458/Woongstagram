import { client } from './sanity';

type OAuthUser = {
  id: string;
  name: string;
  userName: string;
  email: string;
  image?: string | null;
};

export function addUser({ id, name, userName, email, image }: OAuthUser) {
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
