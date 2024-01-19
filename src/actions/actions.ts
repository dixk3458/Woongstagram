'use server';

import { revalidateTag } from 'next/cache';

export default async function revalidateProfileUser(userid: string) {
  return revalidateTag(`profile/${userid}`);
}
