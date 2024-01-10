// 타입스크립트의 장점

// SideBar에서 활용하기위한 간단한 user데이터를 정의

// User 타입은 로그인 후 사용자 세션에 저장되는 데이터이다.
// SideBar에 사용됨
export type User = {
  username: string;
  email: string;
  image?: string;
  userid: string;
};

// User 타입에서 image와 userid를 뽑아 새로운 SimpleUser타입을 생성
// 타입스크립트의 장점
export type SimpleUser = Pick<User, 'image' | 'userid'>;

// 세션에서 관리되지 않는 following,followers...
// 등의 User의 모든 데이터를 담는 타입
export type DetailUser = User & {
  // following의 타입은 User일수가 없다.
  // 우리가 api/me에서 데이터를 가져올때 projection을 통해 원하는 데이터만 가져왔기 때문이다.
  //(image,userid)를 담는 배열타입
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};

export type SearchedUser = User & {
  following: number;
  followers: number;
};
