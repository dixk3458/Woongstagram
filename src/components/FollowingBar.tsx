'use client';

import { DetailUser } from '@/model/user';
import Link from 'next/link';
import useSWR from 'swr';
import Avatar from './Avatar';
import { Hourglass } from 'react-loader-spinner';

export default function FollowingBar() {
  const { data, isLoading: loading, error } = useSWR<DetailUser>('/api/me');
  const followingUsers = data?.following;

  return (
    <section>
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
        <ul>
          {followingUsers.map(({ userName, image }) => (
            <li key={userName}>
              <Link href={`/user/${userName}`}>
                <Avatar image={image} highlight={true} />
                <p>{userName}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
