export type Comment = {
  comment: string;
  userid: string;
  userimage: string;
};

export type FullPost = {
  userid: string;
  userimage: string;
  photo: string;
  text: string;
  comments: Comment[];
  likes: string[];
  id: string;
  createdAt: string;
};

export type SimplePost = Omit<FullPost, 'comments'> & {
  comments: number;
};
