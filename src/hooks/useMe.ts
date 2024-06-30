import { HomeUser } from '@/model/user';
import axios from 'axios';
import { useCallback } from 'react';
import useSWR from 'swr';

async function updateBookmark(postId: string, bookmark: boolean) {
  return axios
    .put('/api/bookmark', { postId: postId, bookmark: bookmark })
    .then(res => res.data);
}

async function updateFollow(targetId: string, follow: boolean) {
  return axios
    .put('/api/follow', { targetId: targetId, follow: follow })
    .then(res => res.data);
}

export default function useMe() {
  const {
    data: user,
    isLoading: loading,
    error,
    mutate,
  } = useSWR<HomeUser>('/api/me');

  const setBookmark = useCallback(
    (postId: string, bookmark: boolean) => {
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
    },
    [user, mutate]
  );

  const toggleFollow = useCallback(
    (targetId: string, follow: boolean) => {
      return mutate(updateFollow(targetId, follow), {
        populateCache: false,
      });
    },
    [mutate]
  );

  return { user, loading, error, setBookmark, toggleFollow };
}
