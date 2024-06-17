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
    .then(posts => mapPosts(posts));
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

export async function getPostsOf(userName: string) {
  return client
    .fetch(
      `*[_type == "post" && author->userName == "${userName}"]
     | order(_createdAt desc){
      ${simplePostsProjection}
    }`
    )
    .then(posts => mapPosts(posts));
}
export async function getLikedPostsOf(userName: string) {
  return client
    .fetch(
      `*[_type == "post" && "${userName}" in likes[]->userName]
     | order(_createdAt desc){
      ${simplePostsProjection}
    }`
    )
    .then(posts => mapPosts(posts));
}
export async function getBookmarkedPostsOf(userName: string) {
  return client
    .fetch(
      `*[_type == "post" && _id in *[_type == "user" && userName == "${userName}"].bookmarks[]._ref]
     | order(_createdAt desc){
      ${simplePostsProjection}
    }`
    )
    .then(posts => mapPosts(posts));
}

function mapPosts(posts: SimplePost[]) {
  return posts.map((post: SimplePost) => ({
    ...post,
    likes: post.likes ?? [],
    image: urlFor(post.image),
  }));
}

export async function likePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .setIfMissing({ likes: [] })
    .append('likes', [
      {
        _ref: userId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function dislikePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref == "${userId}"]`])
    .commit();
}

export async function addComment(postId: string, userId: string, text: string) {
  return client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .append('comments', [
      {
        author: {
          _ref: userId,
          _type: 'reference',
        },
        text: text,
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}
