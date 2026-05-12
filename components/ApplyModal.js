'use client';
import { useState } from 'react';

export default function ApplyModal({ coach, onClose }) {
  const [form, setForm] = useState({
    name: '', phone: '', industry: '', timing: '1month', note: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, coachId: coach.id, coachName: coach.name }),
      });
      setDone(true);
    } catch (err) { alert('전송 오류: ' + err.message); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="닫기">✕</button>

        {!done ? (
          <>
            <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 22, marginTop: 8, marginBottom: 6 }}>
              {coach.name} 코치와 4주 동행 신청
            </div>
            <p style={{ fontFamily: 'var(--f-accent)', fontStyle: 'italic', fontSize: 14, color: 'var(--ink-soft)', marginBottom: 4 }}>
              4주 50만 원 패키지 (회당 5만 원·총 10회)
            </p>
            <p style={{ fontSize: 12, color: 'var(--ink-faint)', fontFamily: 'var(--f-mono)', letterSpacing: '0.04em', borderBottom: '1px solid var(--ink-faint)', paddingBottom: 12, marginBottom: 4 }}>
              신청 후 24시간 내 카카오톡 연락
            </p>

            <form onSubmit={submit}>
              <label>이름</label>
              <input required value={form.name} onChange={onChange('name')} placeholder="실명 또는 가명" />

              <label>연락처 (카카오톡 ID 또는 전화)</label>
              <input required value={form.phone} onChange={onChange('phone')} placeholder="010-0000-0000 또는 카톡ID" />

              <label>운영 중인 업종</label>
              <input required value={form.industry} onChange={onChange('industry')} placeholder="예: 카페 / 족발집 / 미용실" />

              <label>폐업 예상 시점</label>
              <select value={form.timing} onChange={onChange('timing')}>
                <option value="urgent">이번 달 안</option>
                <option value="1month">1개월 이내</option>
                <option value="3month">3개월 이내</option>
                <option value="6month">6개월 이내</option>
                <option value="undecided">아직 고민 중</option>
              </select>

              <label>한 줄 메모 (선택)</label>
              <textarea value={form.note} onChange={onChange('note')} placeholder="현재 가장 막막한 부분을 한 줄로" />

              <button type="submit" disabled={submitting}>
                {submitting && <span className="spinner" />}
                {submitting ? '전송 중...' : '신청 하기'}
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: 56, color: 'var(--seal)', marginBottom: 8, fontWeight: 700 }}>접수</div>
            <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: 22, marginBottom: 8 }}>신청이 접수되었습니다</div>
            <p style={{ fontFamily: 'var(--f-body)', fontSize: 15 }}>
              24시간 안에 <strong style={{ color: 'var(--seal)', fontWeight: 700 }}>{coach.name} 코치</strong>가 직접 카카오톡으로 연락드립니다.
            </p>
            <p style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 20, padding: 16, background: 'var(--paper-deep)', border: '1px dashed var(--ink-soft)', fontFamily: 'var(--f-mono)', letterSpacing: '0.03em', lineHeight: 1.7 }}>
              ※ 본 데모는 2026 모두의창업 프로젝트 응모용 프로토타입입니다.<br />
              실제 매칭은 본심 통과 후 정식 운영 단계에서 진행됩니다.
            </p>
            <button onClick={onClose}>닫 기</button>
          </div>
        )}
      </div>
    </div>
  );
}
