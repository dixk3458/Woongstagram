import HeartIcon from './ui/icon/HeartIcon';
import BookmarkIcon from './ui/icon/BookmarkIcon';
import { parseDate } from '@/util/date';
import ToggleButton from './ui/ToggleButton';
import HeartFillIcon from './ui/icon/HeartFillIcon';
import BookmarkFillIcon from './ui/icon/BookmarkFillIcon';
import { SimplePost } from '@/model/post';
import { useSession } from 'next-auth/react';
import usePosts from '@/hooks/usePosts';
import useMe from '@/hooks/useMe';
import CommentForm from './CommentForm';
import { Comment } from '@/model/comment';

type Props = {
  post: SimplePost;
  children?: React.ReactNode;
  onComment: (comment: Comment) => void;
};

export default function ActionBar({ post, children, onComment }: Props) {
  const { id: postId, likes, userName, text, createdAt } = post;
  const { data: session } = useSession();
  const { user, loading, error, setBookmark } = useMe();

  const liked = user ? likes.includes(user.userName) : false;
  const bookmarked = user ? user.bookmarks.includes(postId) : false;

  // 내부로직에 대해서 ActionBar 컴포넌트가 많이 알고있다 -> 내부 로직을 처리하는 부분을 따로 커스텀 훅으로 처리해주자.
  // 재사용성 +, 유지보수성 +

  const { setLike } = usePosts();
  const handleLike = (like: boolean) => {
    if (user) {
      setLike(post, user.userName, like);
    }
  };

  const handleBookmark = (bookmark: boolean) => {
    if (user) {
      setBookmark(postId, bookmark);
    }
  };

  const handleComment = (text: string) => {
    user &&
      onComment({
        comment: text,
        userName: user.userName,
        userImage: user.image,
      });
  };
  return (
    <>
      <div className="flex justify-between px-4 py-2">
        <ToggleButton
          toggled={liked}
          onToggle={like => handleLike(like)}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={bookmark => handleBookmark(bookmark)}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="font-bold mb-1">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? 'Likes' : 'Like'
        }`}</p>
        {children}
        <p className="text-neutral-400 mb-1">{parseDate(createdAt)}</p>
      </div>
      <CommentForm onPostComment={text => handleComment(text)} />
    </>
  );
}
