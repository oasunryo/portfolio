import { Outfit, Inter } from 'next/font/google';
import './globals.css';

// Google Fonts optimized by Next.js
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

// SEO Best Practices - Metadata API
export const metadata = {
  title: '나만의 독창적인 포트폴리오 | Notion & Next.js Dynamic Website',
  description: '노션 데이터베이스와 연동하여 자동으로 실시간 업데이트되는 프리미엄 반응형 포트폴리오 웹사이트입니다.',
  keywords: '포트폴리오, 개발자 포트폴리오, 노션 연동, Next.js, Notion API, 포트폴리오 제작, 반응형 웹',
  authors: [{ name: 'Antigravity Creator' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
