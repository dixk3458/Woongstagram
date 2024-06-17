import { HomeUser } from '@/model/user';
import { useCallback } from 'react';
import useSWR from 'swr';

function updateBookmark(postId: string, bookmark: boolean) {
  return fetch('/api/bookmark', {
    method: 'PUT',
    body: JSON.stringify({ postId: postId, bookmark: bookmark }),
  }).then(res => res.json());
}

export default function useMe() {
  const {
    data: user,
    isLoading: loading,
    error,
    mutate,
  } = useSWR<HomeUser>('/api/me');

  const setBookmark = useCallback((postId: string, bookmark: boolean) => {
    if (!user) {
      return;
    }

    const prevBookmarks = user.bookmarks ?? [];

    const newUser = bookmark
      ? { ...user, bookmarks: [...prevBookmarks, postId] }
      : { ...user, bookmarks: user?.bookmarks.filter(b => b !== postId) };

    return mutate(updateBookmark(postId, bookmark), {
      optimisticData: newUser,
      revalidate: false,
      populateCache: false,
      rollbackOnError: true,
    });
  }, [user,mutate]);

  return { user, loading, error, setBookmark };
}
