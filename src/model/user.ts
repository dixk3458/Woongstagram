// 세션에서 사용할 수 있는 User
export type User = {
  name: string;
  email: string;
  userName: string;
  image?: string;
};

export type SimpleUser = Pick<User, 'userName' | 'image'>;

export type DetailUser = User & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};
