import { Comment } from './comment';

export type FullPost = {
  id: string;
  createdAt: string;
  userName: string;
  userImage: string;
  text: string;
  image: string;
  likes: string[];
  comments: Comment[];
};

export type SimplePost = Omit<FullPost, 'comments'> & {
  comments: number;
};
