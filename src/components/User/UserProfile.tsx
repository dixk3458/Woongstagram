import { ProfileUser } from '@/model/user';
import Avatar from '../Avatar/Avatar';
import FollowButton from './FollowButton';

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
  // params로 전달된 사용자 페이지
  const { userid, username, image, following, followers, posts } = user;

  const info = [
    { title: 'following', data: following },
    { title: 'followers', data: followers },
    { title: 'posts', data: posts },
  ];
  return (
    <section className="w-full flex flex-col items-center justify-center py-12 border-b border-gray-400 md:flex-row ">
      <Avatar image={image} highlight size="xlarge" />
      <div className="md:ml-10 basis-1/3">
        <div className="flex flex-col items-center  md:flex-row">
          <h1 className="text-2xl md:mr-8 my-2 md:mb-0">{userid}</h1>
          <FollowButton user={user} />
        </div>
        <ul className="my-4 flex gap-4">
          {info.map(({ title, data }, index) => (
            <li key={index}>
              <span className="font-bold mr-1">{data}</span>
              {title}
            </li>
          ))}
        </ul>
        <p className="text-xl font-bold text-center md:text-start">
          {username}
        </p>
      </div>
    </section>
  );
}
