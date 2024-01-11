import { ProfileUser } from '@/model/user';
import Avatar from '../Avatar/Avatar';
import FollowButton from './FollowButton';

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
  const { userid, username, userimage, following, followers, posts } = user;

  const info = [
    { title: 'following', data: following },
    { title: 'followers', data: followers },
    { title: 'posts', data: posts },
  ];
  return (
    <section>
      <Avatar image={userimage} highlight />
      <div>
        <h1>{userid}</h1>
        <FollowButton user={user} />
      </div>
      <ul>
        {info.map(({ title, data }, index) => (
          <li key={index}>
            <span>{data}</span>
            {title}
          </li>
        ))}
      </ul>
      {username}
    </section>
  );
}
