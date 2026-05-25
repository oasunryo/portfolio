import { NextResponse } from 'next/server';
import { getPageMarkdown } from '@/lib/notion';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ content: '' });
  }

  const md = await getPageMarkdown(id);
  
  return NextResponse.json({ 
    content: md || '상세 소개 내용이 작성되지 않은 포트폴리오 항목입니다. 노션 페이지 내부에 텍스트를 입력해 보세요!' 
  });
}
