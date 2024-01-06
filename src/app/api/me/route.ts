import { NextResponse } from 'next/server';

export async function GET() {
  console.log('api/me');
  return NextResponse.json('안녕');
}
