'use client';

import { HomeUser, ProfileUser } from '@/model/user';
import useSWR from 'swr';
import Button from '../UI/Button/Button';

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  // 지금 보고있는 user가 로그인 사용자가 following하는지를 확인해야한다.

  // 버튼의 클릭이벤트를 처리해야하기때문에, Client Component로 생성을하자.

  // 현재 로그인한 사용자(나)를 얻는다.
  const { data: loggedInUser, isLoading, error } = useSWR<HomeUser>('/api/me');

  // 클라이언트 측에서 서버에게 내가
  // 로그인한 사용자의 following배열에 인자로 전달받은 user의 userid가 있는지 검사

  // 자기 userpage에 들어왔다면 안보여줘야한다.
  const isShow = loggedInUser && loggedInUser?.userid !== user.userid;

  const isFollowing =
    loggedInUser &&
    loggedInUser.following.find(
      followingUser => followingUser.userid === user.userid
    );

  const text = isFollowing ? 'Unfollow' : 'Follow';
  return (
    <>
      {isShow && (
        <Button
          text={text}
          onClick={() => {}}
          red={text === 'Unfollow'}
        />
      )}
    </>
  );
}
