import { SimplePost } from '@/model/post';
import { client, urlFor } from './sanity';

const simplePostsProjection = `
...,
"userName":author->userName,
"userImage":author->image,
"image":photo,
"likes":likes[]->userName,
"text":comments[0].text,
"comments":count(comments),
"id":_id,
"createdAt":_createdAt,
`;

export async function getFollowingPostsOf(userName: string) {
  // 서버측에서 Sanity에 요청
  return client
    .fetch(
      `*[_type == "post" && author->userName == "${userName}"
            || author._ref in *[_type == "user" && userName == "${userName}"].following[]._ref]
            | order(_createdAt desc){${simplePostsProjection}}`
    )
    .then(posts =>
      posts.map((post: SimplePost) => ({ ...post, image: urlFor(post.image) }))
    );
}

export async function getPost(postId: string) {
  return client
    .fetch(
      `*[_type == "post" && _id == "${postId}"][0]{
      ...,
      "userName":author->userName,
      "userImage":author->image,
      "image":photo,
      "likes":likes[]->userName,
      "comments":comments[]{"comment":text,"userName":author->userName,"userImage":author->image},
      "id":_id,
      "createdAt":_createdAt
    }`
    )
    .then(post => ({ ...post, image: urlFor(post.image) }));
}
