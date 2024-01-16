'use client';

import Link from 'next/link';
import { PropagateLoader } from 'react-spinners';
import Avatar from '../Avatar/Avatar';
import ScrollableBar from '../UI/Carousel/ScrollableBar';
import useMe from '@/hook/useMe';

// FollowingBar는 로그인한 사용자의 Following 데이터를 보여주면된다.
// 사용자가 로그인에 성공했으면 서버측에서 사용자에 대한 페이지를 렌더링해서 주는데
// 그때 서버측에서 Following 데이터까지 이용해 페이지를 준비할수도 있겠지만,
// 서버측에서 과부하가 발생하지 않도록 클라이언트측에서 요청을해 만들수도 있다.
// 우리는 클라이언트 컴포넌트로 만들어 할 계획이다.

// SSR로 만들어진 Page에서 User에 대한 정보를 가져왔다.
// 해당 User 세션을 이용해 요청을하자.

export default function FollowingBar() {
  // 1. 클라이언트 컴포넌트에서 백엔드에게 api/me 사용자의 정보를 얻어옴
  // 이때 세션으로 얻어온 userid를 이용해 api 요청을 할 필요가없다.
  // 왜냐하면 로그인이 성공적으로 끝나면 백엔드는 응답을 보낼때 로그인(JWT) 토큰을 보내준다.
  // 그래서 이 후 서버에 api 요청을할때 브라우저에서 자동적으로 붙여 요청을하기에 그 사람이 누구인지 알수있다.

  // 2. 백엔드에서는 현재 로그인된 사용자의 세션 정보를 이용해서
  // 3. 백엔드에서 사용자의 상세 정보를 Sanity에서 가지고 옴(following)
  // 4 클라이언트 컴포넌트에서 UI를 보여줌

  const { user, isLoading: loading, error } = useMe();
  // useSWR의 return 타입이 any이기때문에 data가 불명확하다.
  // 타입의 안정성을 더해주기위해 새로운 type을 정의해보자.

  const followingUsers = user?.following;
  //

  return (
    <section className="w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 min-h-[90px] rounded-lg overflow-x-auto relative z-0">
      {loading ? (
        <PropagateLoader size={15} color="#F63D38" />
      ) : (
        (!followingUsers || followingUsers.length === 0) && (
          <p>{`You don't have following`}</p>
        )
      )}
      {followingUsers && followingUsers.length > 0 && (
        <ScrollableBar>
          {followingUsers.map(({ userid, image }) => (
            <Link
              key={userid}
              className="flex flex-col justify-center items-center w-20"
              href={`/user/${userid}`}
            >
              <Avatar image={image} highlight />
              <p className="w-full text-sm text-center text-ellipsis overflow-hidden">
                {userid}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}
