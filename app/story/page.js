import Image from 'next/image';

export const metadata = {
  title: '박용군 1호 코치 이야기 | 사장님의 사장님',
  description: '평택 부용로에서 10년간 족발집을 운영하다 2021년 코로나로 문을 닫은 박용군 1호 코치의 5년 이야기.',
};

const TIMELINE = [
  { year: '2006', label: '첫 사업 시작', desc: '5년간 작은 사업 몇 가지 운영' },
  { year: '2011', label: '평택 족발집 개업', desc: '부용로 골목, 직원 4명, 단골 700명' },
  { year: '2020', label: '코로나 직격', desc: '월 매출 70% 급감, 임대료는 그대로' },
  { year: '2021', label: '폐업 결정', desc: '권리금 못 받고 문 닫음. 빚 + 신용점수 하락' },
  { year: '2022', label: '회복 3년', desc: '신용점수 회복까지 36개월. 인터넷 카페만 의지' },
  { year: '2025', label: '부동산 임대업 + 1호 코치', desc: '폐업한 후배 사장님들을 매주 만나며 동행 결심' },
];

const REGRETS = [
  { title: '신용회복위원회 사전상담', detail: '폐업 6개월 뒤에야 알았습니다. 미리 신청했다면 신용점수 회복이 1년은 빨랐을 것입니다.' },
  { title: '부가세 폐업확정신고 25일 룰', detail: '폐업일로부터 25일 안에 신고해야 가산세를 피합니다. 저는 한참 뒤에야 알았습니다.' },
  { title: '권리금 회수 협상 시점', detail: '임차인이 임대인에게 알려야 할 의무 시점이 있습니다. 놓치면 권리금 보호 못 받습니다.' },
  { title: '4대보험 상실신고', detail: '직원 4명을 한 달 안에 상실신고 못해 과태료를 물었습니다.' },
  { title: '자존감 회복 4주 매뉴얼', detail: '"내가 망했다"는 감정에 잠식되지 않게 4주를 살아내는 법. 이게 가장 어려웠습니다.' },
];

export default function StoryPage() {
  return (
    <>
      <div className="story-hero">
        <div className="story-illust">
          <Image
            src="/coach-pyg.png"
            alt="박용군 1호 코치 일러스트"
            width={280}
            height={280}
            priority
          />
        </div>
        <div>
          <span className="tag">1호 코치</span>
          <h1>5년 전의 나에게,<br />지금의 후배 사장님께</h1>
          <p className="lead" style={{ marginTop: 16 }}>
            평택 부용로 골목에서 10년 동안 족발집을 했습니다. 2021년 겨울, 코로나로 문을 닫았습니다.
            그때 누가 알려줬더라면, 다른 80만 명이 같은 미로를 걷지 않도록 — 제가 1호 코치가 되겠습니다.
          </p>
        </div>
      </div>

      <h2>박용군의 5년 — 타임라인</h2>
      <div className="timeline">
        {TIMELINE.map((t) => (
          <div key={t.year} className="timeline-item">
            <div className="timeline-year">{t.year}</div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{t.label}</div>
              <div style={{ fontSize: 14, color: 'var(--ink-soft)' }}>{t.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <h2>그때 누가 알려줬더라면 — 5가지</h2>
      <p>
        제가 5년 전 헤맸던 30개 절차 중, 가장 뼈아픈 5가지입니다. 후배 사장님은 같은 미로를 걷지 않게 하겠습니다.
      </p>
      <div className="regrets">
        {REGRETS.map((r, i) => (
          <div key={i} className="regret-card">
            <div className="regret-num">{i + 1}</div>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{r.title}</div>
              <div style={{ fontSize: 14, color: 'var(--ink-soft)' }}>{r.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 48, padding: 32, background: 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%)', borderRadius: 16, textAlign: 'center' }}>
        <h2 style={{ marginTop: 0 }}>이제 제가, 후배 사장님께 알려드립니다</h2>
        <p>4주 동안 30개 절차를 1:1로 동행합니다. 회당 5만 원·총 50만 원.</p>
        <a href="/match" style={{ display: 'inline-block', marginTop: 16, background: 'var(--accent)', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 600 }}>
          박용군 코치와 매칭하기 →
        </a>
      </div>
    </>
  );
}
