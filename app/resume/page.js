'use client';
import { useState } from 'react';

export default function ResumePage() {
  const [form, setForm] = useState({
    name: '',
    industry: '외식업 (카페)',
    years: '5',
    closeReason: '',
    learned: '',
    nextPlan: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResult(data.text || data.error || '응답을 받지 못했습니다.');
    } catch (err) {
      setResult('오류: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const print = () => window.print();

  return (
    <>
      <span className="tag">PDF 출력</span>
      <h1>실패 경력서 — 도전 경력서 자동 생성</h1>
      <p className="lead">
        폐업 사유와 배운 점을 입력하면 AI가 재도전 펀드·정책자금 신청용 "도전 경력서" 양식으로
        정리합니다. 출력 후 인쇄 → PDF 저장.
      </p>

      <form onSubmit={submit}>
        <label>이름 (선택, 가명 가능)</label>
        <input value={form.name} onChange={onChange('name')} placeholder="예: 김도현" />

        <div className="row">
          <div>
            <label>업종</label>
            <select value={form.industry} onChange={onChange('industry')}>
              <option>외식업 (카페)</option>
              <option>외식업 (족발/한식)</option>
              <option>외식업 (치킨/분식)</option>
              <option>서비스업 (미용)</option>
              <option>유통 (편의점)</option>
              <option>교육 (학원)</option>
              <option>소매 (의류/잡화)</option>
              <option>기타</option>
            </select>
          </div>
          <div>
            <label>운영 연차</label>
            <select value={form.years} onChange={onChange('years')}>
              <option value="1">1년 미만</option>
              <option value="3">1~3년</option>
              <option value="5">3~5년</option>
              <option value="8">5~8년</option>
              <option value="10">8~10년</option>
              <option value="15">10년 이상</option>
            </select>
          </div>
        </div>

        <label>폐업 사유 (자유 서술)</label>
        <textarea
          placeholder="예: 코로나 매출 급감, 임대료 인상, 본사 정산 분쟁 등 — 솔직하게 작성하세요."
          value={form.closeReason}
          onChange={onChange('closeReason')}
        />

        <label>운영 중 배운 점·강점</label>
        <textarea
          placeholder="예: 월 매출 3천 → 1억 성장, 단골 200명 데이터, 직원 5명 관리, SNS 마케팅 등"
          value={form.learned}
          onChange={onChange('learned')}
        />

        <label>다음 도전·재출발 방향</label>
        <textarea
          placeholder="예: 재취업 / 작은 규모로 재창업 / 온라인 전환 / 동종업계 매니저 등"
          value={form.nextPlan}
          onChange={onChange('nextPlan')}
        />

        <button type="submit" disabled={loading}>
          {loading && <span className="spinner" />}
          {loading ? 'AI 작성 중... (3~6초)' : '도전 경력서 생성'}
        </button>
      </form>

      {result && (
        <>
          <div className="result">{result}</div>
          <button onClick={print} style={{ background: '#1f2937' }}>
            인쇄 / PDF 저장
          </button>
        </>
      )}
    </>
  );
}
