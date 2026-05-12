'use client';
import { useState, useMemo } from 'react';
import { COACHES } from '../../lib/coaches';
import ApplyModal from '../../components/ApplyModal';

export default function MatchPage() {
  const [industry, setIndustry] = useState('전체');
  const [region, setRegion] = useState('전체');
  const [failType, setFailType] = useState('전체');
  const [applyCoach, setApplyCoach] = useState(null);

  const industries = ['전체', ...new Set(COACHES.map((c) => c.industry))];
  const regions = ['전체', ...new Set(COACHES.map((c) => c.region))];
  const failTypes = ['전체', ...new Set(COACHES.map((c) => c.failType))];

  const filtered = useMemo(() => {
    return COACHES.filter((c) => {
      if (industry !== '전체' && c.industry !== industry) return false;
      if (region !== '전체' && c.region !== region) return false;
      if (failType !== '전체' && c.failType !== failType) return false;
      return true;
    });
  }, [industry, region, failType]);

  return (
    <>
      <span className="tag">3축 매칭</span>
      <h1>폐업 동행 코치 매칭</h1>
      <p className="lead">
        업종·지역·실패유형 3축으로 가장 가까운 선배 사장님과 1:1 매칭됩니다.
        4주 50만 원 패키지 (회당 5만 원·총 10회).
      </p>

      <div className="row" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        <div>
          <label>업종</label>
          <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
            {industries.map((i) => <option key={i}>{i}</option>)}
          </select>
        </div>
        <div>
          <label>지역</label>
          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            {regions.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label>실패 유형</label>
          <select value={failType} onChange={(e) => setFailType(e.target.value)}>
            {failTypes.map((f) => <option key={f}>{f}</option>)}
          </select>
        </div>
      </div>

      <h2 style={{ marginTop: 36 }}>매칭 결과 ({filtered.length}명)</h2>

      {filtered.map((c) => (
        <div key={c.id} className={`coach-card ${c.featured ? 'featured' : ''}`}>
          <div className="avatar">{c.initial}</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <strong style={{ fontSize: 17 }}>{c.name}</strong>
              <span className="tag" style={{ marginBottom: 0 }}>{c.title}</span>
            </div>
            <div className="coach-meta">
              {c.industry} · {c.region} · {c.years}년 운영 · {c.failType}
            </div>
            <p style={{ fontSize: 14, marginTop: 6 }}>{c.bio}</p>
            <div className="coach-skills">
              {c.skills.map((s) => <span key={s} className="skill">{s}</span>)}
            </div>
            <button
              onClick={() => setApplyCoach(c)}
              style={{ marginTop: 14, padding: '10px 20px', fontSize: 14 }}
            >
              4주 동행 신청
            </button>
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <p style={{ marginTop: 24 }}>조건에 맞는 코치가 없습니다. 필터를 조정해보세요.</p>
      )}

      {applyCoach && <ApplyModal coach={applyCoach} onClose={() => setApplyCoach(null)} />}
    </>
  );
}
