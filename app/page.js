export default function HomePage() {
  return (
    <>
      <span className="tag">한국 최초 폐업 동행 플랫폼</span>
      <h1>전 망한 게 아니에요,<br />졸업한 거예요.</h1>
      <p className="lead">
        매년 80만 명이 자영업 폐업을 합니다. "잘 시작하는 법"을 가르치는 곳은 수천 곳인데,
        "잘 끝내는 법"을 가르치는 곳은 한 곳도 없습니다.
        폐업한 사장님이 폐업할 사장님을 4주간 1:1 동행합니다.
      </p>

      <div className="card-grid">
        <a href="/diagnose" className="card">
          <span className="tag">30초</span>
          <h3>폐업 진단</h3>
          <p>업종·연차·직원수를 입력하면 AI가 30개 절차 중 당신에게 해당하는 항목만 골라 4주 캘린더를 만들어드립니다.</p>
        </a>
        <a href="/match" className="card">
          <span className="tag">1:1 매칭</span>
          <h3>코치 매칭</h3>
          <p>5년 이상 자영업 후 폐업을 직접 경험한 선배 사장님과 매칭됩니다. 1호 코치는 평택 족발 10년 박용군.</p>
        </a>
        <a href="/resume" className="card">
          <span className="tag">PDF</span>
          <h3>실패 경력서</h3>
          <p>폐업 사유와 배운 점을 입력하면 AI가 재도전 펀드 신청용 "도전 경력서"를 자동 생성합니다.</p>
        </a>
      </div>

      <h2>한국 폐업 시장의 두 극단 사이</h2>
      <p>
        소상공인진흥공단 무료 컨설팅(품질·접근성 한계)과 세무사 폐업 대행(150만 원, 세무만)
        — 그 사이의 빈자리를 <strong>회당 5만 원·4주 50만 원 통합 패키지</strong>로 채웁니다.
      </p>

      <h2>4주 30개 절차 동행</h2>
      <p>
        ① 신용회복 8개 · ② 법무 8개 · ③ 세무 8개 · ④ 심리·재출발 6개 — 모두 1호 코치(박용군)가 5년 전
        평택 족발집을 닫으며 직접 헤맸던 항목들입니다.
      </p>
    </>
  );
}
