'use client';

import { DetailUser } from '@/model/user';
import Link from 'next/link';
import useSWR from 'swr';
import Avatar from './Avatar';
import { Hourglass } from 'react-loader-spinner';
import ScrollableBar from './ScrollableBar';

export default function FollowingBar() {
  const { data, isLoading: loading, error } = useSWR<DetailUser>('/api/me');
  const followingUsers = data?.following && [
    ...data.following,
    ...data.following,
    ...data.following,
    ...data.following,
    ...data.following,
    ...data.following,
    ...data.following,
    ...data.following,
  ];

  return (
    <section className="mb-8 bg-gradient-to-bl from-indigo-300 via-purple-300 to-pink-300 rounded-lg shadow-lg p-[0.2rem]">
      <div className="bg-white w-full min-h-[90px] flex justify-center items-center rounded-md overflow-x-auto p-4 relative z-0">
        {loading ? (
          <Hourglass
            visible={true}
            height="40"
            width="40"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#306cce', '#72a1ed']}
          />
        ) : (
          (!followingUsers || followingUsers.length === 0) && (
            <p>{`You don't have following`}</p>
          )
        )}
        {followingUsers && followingUsers.length > 0 && (
          <ScrollableBar>
            {followingUsers.map(({ userName, image }) => (
              <Link
                key={userName}
                href={`/user/${userName}`}
                className="flex flex-col items-center w-20"
              >
                <Avatar image={image} highlight={true} />
                <p className="text-sm text-ellipsis overflow-hidden w-full">
                  {userName}
                </p>
              </Link>
            ))}
          </ScrollableBar>
        )}
      </div>
    </section>
  );
}
