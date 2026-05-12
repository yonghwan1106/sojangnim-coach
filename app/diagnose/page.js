'use client';
import { useState } from 'react';

export default function DiagnosePage() {
  const [form, setForm] = useState({
    industry: '외식업 (카페)',
    years: '5',
    employees: '2',
    rented: 'yes',
    debt: 'medium',
    extra: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('/api/diagnose', {
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

  return (
    <>
      <span className="tag">30초 진단</span>
      <h1>폐업 진단 — 4주 캘린더 자동 생성</h1>
      <p className="lead">
        업종과 상황을 입력하면 30개 절차 중 본인에게 해당하는 18~22개를 골라
        Week1~Week4로 자동 정리합니다. (Claude Haiku 4.5)
      </p>

      <form onSubmit={submit}>
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

        <div className="row">
          <div>
            <label>직원 수</label>
            <select value={form.employees} onChange={onChange('employees')}>
              <option value="0">없음 (1인)</option>
              <option value="2">1~2명</option>
              <option value="5">3~5명</option>
              <option value="10">6~10명</option>
              <option value="15">10명 이상</option>
            </select>
          </div>
          <div>
            <label>임대 상황</label>
            <select value={form.rented} onChange={onChange('rented')}>
              <option value="yes">상가 임대 중</option>
              <option value="own">본인 소유</option>
              <option value="sub">전대 (재임대)</option>
            </select>
          </div>
        </div>

        <label>현재 부채 수준</label>
        <select value={form.debt} onChange={onChange('debt')}>
          <option value="low">3천만 원 이하</option>
          <option value="medium">3천~1억 원</option>
          <option value="high">1억 원 이상</option>
        </select>

        <label>추가 상황 (선택)</label>
        <textarea
          placeholder="예: 권리금 회수 어려움, 직원 퇴직금 미지급, 프랜차이즈 본사와 분쟁 등"
          value={form.extra}
          onChange={onChange('extra')}
        />

        <button type="submit" disabled={loading}>
          {loading && <span className="spinner" />}
          {loading ? 'AI 분석 중... (3~5초)' : '4주 캘린더 생성'}
        </button>
      </form>

      {result && <div className="result">{result}</div>}
    </>
  );
}
