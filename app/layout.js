import './globals.css';
import Footer from '../components/Footer';

export const metadata = {
  title: '사장님의 사장님 — 폐업 동행 코치',
  description: '폐업한 사장이 폐업할 사장을 4주간 1:1 동행하는 한국 최초 "잘 끝내는 법" 양면 시장 플랫폼',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <header className="header">
          <a href="/" className="logo">사장님의 <strong>사장님</strong></a>
          <nav className="nav">
            <a href="/diagnose">폐업 진단</a>
            <a href="/match">코치 매칭</a>
            <a href="/resume">실패 경력서</a>
          </nav>
        </header>
        <main className="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
