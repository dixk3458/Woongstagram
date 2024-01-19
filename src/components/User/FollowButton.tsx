'use client';

import { ProfileUser } from '@/model/user';
import Button from '../UI/Button/Button';
import useMe from '@/hook/useMe';
import revalidateProfileUser from '@/actions/actions';
import { useState, useTransition } from 'react';
import { PulseLoader } from 'react-spinners';

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const [isFetching, setIsFetching] = useState(false);

  // 지금 보고있는 user가 로그인 사용자가 following하는지를 확인해야한다.

  // 버튼의 클릭이벤트를 처리해야하기때문에, Client Component로 생성을하자.

  // 현재 로그인한 사용자(나)를 얻는다.
  const { user: loggedInUser, isLoading, error, toggleFollow } = useMe();

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

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(user.usertokenid, !isFollowing);
    setIsFetching(false);
    revalidateProfileUser(user.userid);
  };

  return (
    <>
      {isShow && (
        <div className="relative">
          {isFetching && (
            <div className="absolute z-20 inset-0 flex justify-center items-center">
              <PulseLoader size={6} />
            </div>
          )}
          <Button
            isLoading={isFetching}
            text={text}
            onClick={() => {
              handleFollow();
            }}
            red={text === 'Unfollow'}
          />
        </div>
      )}
    </>
  );
}
