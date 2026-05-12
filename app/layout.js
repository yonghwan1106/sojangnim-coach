import './globals.css';
import Footer from '../components/Footer';
import MobileNav from '../components/MobileNav';
import { Analytics } from '@vercel/analytics/react';

const SITE_URL = 'https://sojangnim-coach.vercel.app';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: '사장님의 사장님 — 폐업 동행 코치', template: '%s | 사장님의 사장님' },
  description: '폐업한 사장이 폐업할 사장을 4주간 1:1 동행하는 한국 최초 "잘 끝내는 법" 양면 시장 플랫폼. 1호 코치 박용군 (평택 족발 10년).',
  keywords: ['폐업', '재도전', '소상공인', '자영업', '신용회복', '폐업 동행', '박용군', '모두의창업', '중소벤처기업부'],
  authors: [{ name: '박용군 1호 코치' }],
  openGraph: {
    type: 'website', locale: 'ko_KR', url: SITE_URL,
    title: '사장님의 사장님 — 폐업 동행 코치',
    description: '폐업한 사장님이 폐업할 사장님을 4주간 1:1 동행. 1호 코치 박용군 (평택 족발 10년, 2021 코로나 폐업).',
    siteName: '사장님의 사장님',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '사장님의 사장님' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '사장님의 사장님 — 폐업 동행 코치',
    description: '"전 망한 게 아니에요, 졸업한 거예요." 1호 코치 박용군과 함께하는 4주 동행.',
    images: ['/og.png'],
  },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=Nanum+Myeongjo:wght@400;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="paper-grain" aria-hidden />
        <header className="masthead">
          <div className="masthead-inner">
            <div className="masthead-left">
              <div className="issue-no">제 1 호</div>
              <div className="issue-date">2026년 5월</div>
            </div>
            <a href="/" className="masthead-title">
              <span className="title-han">사장님의 사장님</span>
              <span className="title-sub">— 폐업 동행 계간 —</span>
            </a>
            <div className="masthead-right">
              <div className="issue-tag">폐업 동행 1호</div>
              <div className="issue-price">무 료 배 포</div>
            </div>
          </div>
          <nav className="rule-nav">
            <a href="/story">박용군 이야기 <em>기록</em></a>
            <a href="/diagnose">폐업 진단 <em>처방</em></a>
            <a href="/match">코치 매칭 <em>인연</em></a>
            <a href="/resume">실패 경력서 <em>증서</em></a>
            <MobileNav />
          </nav>
          <div className="rule-thick" />
        </header>
        <main className="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
