// 세션에서 사용할 수 있는 User
export type AuthUser = {
  id: string;
  name: string;
  email: string;
  userName: string;
  image?: string;
};

export type SimpleUser = Pick<AuthUser, 'userName' | 'image'>;

export type HomeUser = AuthUser & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};

export type SearchUser = AuthUser & {
  following: number;
  followers: number;
};

export type ProfileUser = SearchUser & {
  posts: number;
};
