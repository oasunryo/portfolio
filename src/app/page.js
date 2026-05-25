import { getPortfolioItems } from '@/lib/notion';
import PortfolioClient from './components/PortfolioClient';

// ISR (Incremental Static Regeneration) 설정
// 60초마다 백그라운드에서 노션 API를 재조회하여 정적 페이지를 새롭게 갱신합니다.
export const revalidate = 60;

export default async function Home() {
  // 서버 사이드에서 Notion API(또는 모의 데이터)를 통해 포트폴리오 데이터 조회
  const items = await getPortfolioItems();

  return (
    <main>
      <PortfolioClient initialItems={items} />
    </main>
  );
}
