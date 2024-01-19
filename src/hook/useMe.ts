import { HomeUser } from '@/model/user';
import { useCallback } from 'react';
import useSWR from 'swr';

async function updateBookmark(postid: string, bookmark: boolean) {
  return fetch('/api/bookmark', {
    method: 'PUT',
    body: JSON.stringify({
      postid: postid,
      bookmark: bookmark,
    }),
  }).then(res => res.json());
}

export default function useMe() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>('/api/me');

  const setBookmark = useCallback(
    (postid: string, bookmark: boolean) => {
      if (!user) {
        return;
      }
      const bookmarks = user.bookmarks;

      const newUser = {
        ...user,
        bookmarks: bookmark
          ? [...bookmarks, postid]
          : bookmarks.filter(b => b !== postid),
      };

      return mutate(updateBookmark(postid, bookmark), {
        optimisticData: newUser,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [user, mutate]
  );

  return { user, isLoading, error, setBookmark };
}
