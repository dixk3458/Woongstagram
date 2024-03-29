'use client';

import PostListCard from './PostListCard';
import GridSpinner from '../UI/Spinner/GridSpinner';
import usePosts from '@/hook/usePosts';

export default function PostList() {
  // 1. 내가 following 하고있는 유저의 정보를 가져온다.
  // 2. 그 유저들의 post를 가져온다.
  // 3. UI를 보여준다.

  // PostList 컴포넌트는 Client Component로 서버에서 렌더링하기 어려운
  // 데이터를 담고있다.
  // 클라이언트 측에서 서버에 데이터를 요청해야한다.
  // 서버에서는 나에대한 정보를 알고있다.
  // 나의 id를 전달할 이유가 없다.
  // 서버측에서 session 데이터를 이용해 해결하자.

  // Promise로 받아오는 타입을 명시해서 안정성을 높이자.
  const { posts, isLoading: loading, error } = usePosts();

  // 받아온 posts를 순회하면서 UI를 표시해주자.
  return (
    <section>
      {loading && (
        <div className="text-center mt-32">
          {/* GridLoader를 바로 사용하는것이 아니라, 우리가 만들어둔 GridSpinner를 사용해
            미리 페이지를 만드는것이 아니라, lazy하게 dynamic하게 import 할수있도록하자.
           */}
          <GridSpinner color="#F63D38" />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post, index) => (
            <li key={post.id} className="mb-4">
              <PostListCard post={post} priority={index < 2} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
