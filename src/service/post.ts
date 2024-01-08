import { SimplePost } from '@/model/post';
import { client, urlFor } from './sanity';

const simplePostProjection = `
    ...,
    "userid":author->userid,
    "userimage":author->image,
    "photo":photo,
    "likes":likes[]->userid,
    "text":comments[0].comment,
    "comments":count(comments),
    "id":_id,
    "createdAt":_createdAt
`;

export async function getFollowingPostsOf(userid: string) {
  // 해당 user가 following 하고있는 사용자들의 post를 구해야한다.
  // 즉 두 테이블에서 하나의 결과를 추출해야한다.

  // post 테이블에서 userid가 following user.id랑 같은것

  // 자신 Post 가져오고
  // post중에 author 요소가 있는데, 그것은 user를 참조해
  // 내가 following 하는 배열에서 u
  return client
    .fetch(
      `*[_type == "post" && author->userid == "${userid}"
        || author._ref in *[_type == "user" && userid == "${userid}"].following[]._ref]
        | order(_createdAt desc){${simplePostProjection}}`
    )
    .then(posts =>
      posts.map((post: SimplePost) => ({ ...post, photo: urlFor(post.photo) }))
    );
}
