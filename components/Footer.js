export default function Footer() {
  return (
    <footer className="footer">
      <div className="colophon-title">— 판 권 —</div>
      <p>
        <strong>1호 코치 — 박용군</strong> · 평택 족발 10년 (2011 〜 2021, 코로나 폐업) · 부동산 임대업
      </p>
      <p style={{ marginTop: 10 }}>
        2026 모두의 창업 프로젝트 (중소벤처기업부) 응모 · 라이브 프로토타입
      </p>
      <p style={{ marginTop: 10, fontSize: 11, color: 'var(--ink-faint)', letterSpacing: '0.1em' }}>
        Powered by Claude Haiku 4.5 · Next.js 16 · Vercel · 편집 yonghwan1106
      </p>
    </footer>
  );
}
