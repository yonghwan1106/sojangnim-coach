import './globals.css';
import Footer from '../components/Footer';
import MobileNav from '../components/MobileNav';
import { Analytics } from '@vercel/analytics/react';

const SITE_URL = 'https://sojangnim-coach.vercel.app';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '사장님의 사장님 — 폐업 동행 코치',
    template: '%s | 사장님의 사장님',
  },
  description: '폐업한 사장이 폐업할 사장을 4주간 1:1 동행하는 한국 최초 "잘 끝내는 법" 양면 시장 플랫폼. 1호 코치 박용군 (평택 족발 10년).',
  keywords: ['폐업', '재도전', '소상공인', '자영업', '신용회복', '폐업 동행', '박용군', '모두의창업', '중소벤처기업부'],
  authors: [{ name: '박용군 1호 코치' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
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
      <body>
        <header className="header">
          <a href="/" className="logo">사장님의 <strong>사장님</strong></a>
          <nav className="nav">
            <a href="/story">박용군 이야기</a>
            <a href="/diagnose">폐업 진단</a>
            <a href="/match">코치 매칭</a>
            <a href="/resume">실패 경력서</a>
          </nav>
          <MobileNav />
        </header>
        <main className="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
