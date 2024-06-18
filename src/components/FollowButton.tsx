'use client';

import { HomeUser, ProfileUser } from '@/model/user';
import useSWR from 'swr';
import Button from './ui/Button';
import useMe from '@/hooks/useMe';
import { useState, useTransition } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';
import revalidateProfileUser from '@/actions/action';

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  // 로그인한 사람이 해당 사용자 페이지 사람을 팔로우 했는지 알아야한다.
  // 로그인한 사람이 누군지 부터
  // 그리고 인터렉션이 있음으로 client
  const { userName, id: targetId } = user;

  const { user: loggedInUser, toggleFollow } = useMe();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const showButton = loggedInUser && loggedInUser.userName !== userName;

  const isFollowing =
    loggedInUser &&
    loggedInUser.following.find(user => user.userName === userName);

  const text = isFollowing ? 'Unfollow' : 'Follow';

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(targetId, !isFollowing);
    setIsFetching(false);
    revalidateProfileUser(userName);
    // startTransition(() => {
    //   router.refresh();
    // });
  };

  return (
    <>
      {showButton && (
        <div className="relative">
          {isUpdating && (
            <div className="absolute z-20 inset-0 flex justify-center items-center">
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#C1C1C1"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
          <Button
            disabled={isUpdating}
            text={text}
            onClick={() => handleFollow()}
            red={text === 'Unfollow'}
          />
        </div>
      )}
    </>
  );
}
