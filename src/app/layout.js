import './globals.css';

export const metadata = {
  title: 'Junseo Oh | Semiconductor Backend & OSAT Engineer Portfolio',
  description: '노션 API 실시간 데이터 바인딩 및 크림 에디토리얼 테마 기반의 반도체 후공정(PKG & Test) 엔지니어 오준서(Junseo Oh)의 프리미엄 포트폴리오 대시보드입니다.',
  keywords: '반도체 후공정, OSAT, 패키징, 테스트, 데이터 분석, TIBCO Spotfire, SK Hy-Po, Amkor, 오준서, Junseo Oh',
  authors: [{ name: 'Junseo Oh' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
