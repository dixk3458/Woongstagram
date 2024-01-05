import { SimpleUser } from '@/model/user';
import Avatar from '../Avatar/Avatar';

// SideBar은 정적인 데이터를 보여주는 페이지이다.
// 서버측에서 로그인에 성공을해 SSR로 렌더링을해 전달을 해주면된다.
// 즉 서버에서 로그인 사용자 데이터를 가져와야한다.
// 컴포넌트와 페이지 컴포넌트를 잘 구분해주자.
// 컴포넌트에서 요청을 하지말고 컴포넌트는 Props로 받아서 보여주기만 하자

type Props = {
  // 모델 타입을 정의
  user: SimpleUser;
};

export default function SideBar({ user: { username, email, image } }: Props) {
  return (
    <>
      <div>
        {image && <Avatar image={image} />}
        <div>
          <p>{email}</p>
          <p>{username}</p>
        </div>
      </div>
      <p>About • Help • API • jobs • Privacy • Terms • Location • Language</p>
      <p>© 2023 Jaewoong Jeong. All Rights Reserved.</p>
    </>
  );
}
