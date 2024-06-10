import { ProfileUser } from '@/model/user';
import Avatar from './Avatar';
import FollowButton from './FollowButton';

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
  const { image, userName, posts, followers, following } = user;
  const info = [
    { title: 'posts', data: posts },
    { title: 'followers', data: followers },
    { title: 'following', data: following },
  ];
  return (
    <section>
      <Avatar image={image} highlight={true} />
      <div>
        <h1>{userName}</h1>
        <FollowButton user={user} />
        <ul>
          {info.map(({ title, data }, index) => (
            <li key={index}>
              <span>{data}</span>
              {title}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
