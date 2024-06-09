import { ProfileUser } from '@/model/user';

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
    console.log(user)
  return <>{user.userName}</>;
}
