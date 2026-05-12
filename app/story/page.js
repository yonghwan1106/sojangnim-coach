import Image from 'next/image';

export const metadata = {
  title: '박용군 일호 코치 — 회고록',
  description: '평택 부용로에서 10년간 족발집을 운영하다 2021년 코로나로 문을 닫은 박용군 一號 코치의 5년 이야기.',
};

const TIMELINE = [
  { year: '2006', label: '첫 사업 시작', desc: '5년간 작은 사업 몇 가지 운영. 작은 실패와 작은 배움.' },
  { year: '2011', label: '평택 족발집 개업', desc: '부용로 골목, 직원 4명, 단골 700명. 가장 빛나던 10년의 시작.' },
  { year: '2020', label: '코로나 직격', desc: '월 매출 70% 급감, 임대료는 그대로. 직원도 가족도 두려워했다.' },
  { year: '2021', label: '폐업 결정', desc: '권리금 못 받고 문 닫음. 八千萬 원의 빚과 신용점수 0이 남았다.' },
  { year: '2022', label: '회복 三年', desc: '신용점수 회복까지 36개월. 인터넷 카페만이 나의 동행자였다.' },
  { year: '2025', label: '一號 코치로 돌아오다', desc: '부동산 임대업으로 다시 자리 잡으며, 매주 동네 폐업 사장님을 만났다. "내가 그때 누구한테라도 물어봤다면."' },
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
            width={268}
            height={268}
            priority
          />
        </div>
        <div>
          <span className="tag">人 物 記 · 一 號</span>
          <h1>5년 전의 나에게,<br />지금의 後輩 사장님께</h1>
          <p style={{ fontFamily: 'var(--f-accent)', fontStyle: 'italic', fontSize: 17, color: 'var(--ink-soft)', marginTop: 12 }}>
            朴勇君 · 1973년生 · 平澤
          </p>
          <p style={{ marginTop: 18, fontSize: 16, lineHeight: 1.85 }}>
            평택 부용로 골목에서 10년 동안 족발집을 했습니다. 2021년 겨울, 코로나로 문을 닫았습니다.
            그때 누가 알려줬더라면 — 다른 80만 명이 같은 미로를 걷지 않도록, 제가 一號 코치가 되겠습니다.
          </p>
        </div>
      </div>

      <h2>박용군의 5년 — 年 表</h2>
      <div className="timeline">
        {TIMELINE.map((t) => (
          <div key={t.year} className="timeline-item">
            <div className="timeline-year">{t.year}</div>
            <div>
              <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, marginBottom: 4, fontSize: 17 }}>{t.label}</div>
              <div style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.75 }}>{t.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <h2>그때 누가 알려줬더라면 — 五 件 의 後悔</h2>
      <p style={{ marginBottom: 8 }}>
        제가 5년 전 헤맸던 三十個 절차 중, 가장 뼈아픈 다섯 가지입니다. 후배 사장님은 같은 미로를 걷지 않게 하겠습니다.
      </p>
      <div className="regrets">
        {REGRETS.map((r, i) => (
          <div key={i} className="regret-card">
            <div className="regret-num">{['一','二','三','四','五'][i]}</div>
            <div>
              <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, marginBottom: 6, fontSize: 17 }}>{r.title}</div>
              <div style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.8 }}>{r.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="cta-box">
        <h2>이제 제가, 후배 사장님께 알려드립니다</h2>
        <p style={{ fontFamily: 'var(--f-accent)', fontStyle: 'italic', fontSize: 17, color: 'var(--ink-soft)' }}>
          四週 동안 三十個 절차를 1:1로 동행합니다. 회당 五萬 원 · 총 五十萬 원.
        </p>
        <a href="/match" className="cta-link">박용군 코치와 매칭하기 →</a>
      </div>
    </>
  );
}
