const STATS = [
  { num: '80만', label: '연간 폐업 사장님', source: '통계청 「전국사업체조사」' },
  { num: '8천만', label: '평균 부채 (원)', source: '신용회복위원회 채무조정' },
  { num: '30~40만', label: '신용회복 미신청', source: '신용회복위원회 연차보고서' },
  { num: '7년', label: '재기 차단 기간', source: '신용정보법 제25조' },
];

export default function HomePage() {
  return (
    <>
      <span className="tag">創 刊 號 · 卷頭言</span>
      <h1>전 망한 게 아니에요,<br />졸업한 거예요. <em>—— 卒業</em></h1>
      <p className="lead">
        매년 八十萬 명이 자영업 폐업을 합니다. "잘 시작하는 법"을 가르치는 곳은 수천 곳인데,
        "잘 끝내는 법"을 가르치는 곳은 한 곳도 없습니다.
        폐업한 사장님이 폐업할 사장님을 4주간 1:1 동행합니다.
      </p>

      <div className="stats-grid">
        {STATS.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-source">{s.source}</div>
          </div>
        ))}
      </div>

      <div className="card-grid">
        <a href="/diagnose" className="card">
          <span className="tag">三十秒 診斷</span>
          <h3>폐업 진단</h3>
          <p>업종·연차·직원수를 입력하면 三十個 절차 중 본인에게 해당하는 항목만 골라 4주 캘린더를 만들어드립니다.</p>
        </a>
        <a href="/match" className="card">
          <span className="tag">一 對 一 緣</span>
          <h3>코치 매칭</h3>
          <p>5년 이상 자영업 후 폐업을 직접 경험한 선배 사장님과 매칭됩니다. 一號 코치는 평택 족발 10년 박용군.</p>
        </a>
        <a href="/resume" className="card">
          <span className="tag">挑戰 經歷書</span>
          <h3>실패 경력서</h3>
          <p>폐업 사유와 배운 점을 입력하면 AI가 재도전 펀드 신청용 「도전 경력서」를 자동 작성합니다.</p>
        </a>
      </div>

      <a href="/story" className="coach-banner">
        <div className="avatar" style={{ width: 72, height: 72, fontSize: 32 }}>朴</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, marginBottom: 4 }}>
            一號 코치 박용군 — 평택 족발 10년 (二○一一 〜 二○二一, 코로나 폐업)
          </div>
          <div style={{ fontFamily: 'var(--f-accent)', fontStyle: 'italic', fontSize: 14, color: 'var(--ink-soft)' }}>
            "5년 전의 나에게, 지금의 후배 사장님께" — 박용군 이야기 보기 →
          </div>
        </div>
      </a>

      <h2>한국 폐업 시장의 두 극단 사이</h2>
      <p>
        소상공인진흥공단 무료 컨설팅(품질·접근성 한계)과 세무사 폐업 대행(150만 원, 세무만)
        — 그 사이의 빈자리를 <strong>회당 五萬 원·4주 五十萬 원 통합 패키지</strong>로 채웁니다.
      </p>

      <h2>4주 三十個 절차 동행</h2>
      <p>
        ① <strong>信用回復</strong> 8개 · ② <strong>法務</strong> 8개 · ③ <strong>稅務</strong> 8개 · ④ <strong>心理·再出發</strong> 6개.
        모두 一號 코치(박용군)가 5년 전 평택 족발집을 닫으며 직접 헤맸던 항목들입니다.
      </p>

      <small className="footnote">
        通計 出處 : 통계청 「전국사업체조사」(연간), 신용회복위원회 「채무조정 통계」 및 「연차보고서」, 「신용정보의 이용 및 보호에 관한 법률」 제25조.
        본 사이트의 통계는 2024〜2025년 공개 자료 기준이며, 정확한 수치는 각 기관 원문을 참조하시기 바랍니다.
      </small>
    </>
  );
}
