'use client';

import { HomeUser, ProfileUser } from '@/model/user';
import useSWR from 'swr';
import Button from './ui/Button';
import useMe from '@/hooks/useMe';

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  // 로그인한 사람이 해당 사용자 페이지 사람을 팔로우 했는지 알아야한다.
  // 로그인한 사람이 누군지 부터
  // 그리고 인터렉션이 있음으로 client
  const { userName } = user;

  const { user: loggedInUser, toggleFollow } = useMe();

  const showButton = loggedInUser && loggedInUser.userName !== userName;

  const isFollowing =
    loggedInUser &&
    loggedInUser.following.find(user => user.userName === userName);

  const text = isFollowing ? 'Unfollow' : 'Follow';

  const handleFollow = () => {
    toggleFollow(user.id, !isFollowing);
  };

  return (
    <>
      {showButton && (
        <Button
          text={text}
          onClick={() => handleFollow()}
          red={text === 'Unfollow'}
        />
      )}
    </>
  );
}
