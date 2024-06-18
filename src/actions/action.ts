'use server';

import { revalidateTag } from 'next/cache';

export default async function revalidateProfileUser(userName: string) {
  return revalidateTag(`profile/${userName}`);
}
