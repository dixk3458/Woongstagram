import { searchUser } from '@/service/user';
import { NextResponse } from 'next/server';

type Props = {
  params: { keyword: string };
};

export async function GET(_: Request, { params }: Props) {
  return searchUser(params.keyword).then(data => NextResponse.json(data));
}
