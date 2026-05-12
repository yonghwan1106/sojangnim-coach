import { getResult } from '../../../lib/kv';

export const dynamic = 'force-dynamic';

export default async function SharePage({ params }) {
  const { slug } = await params;
  const data = await getResult(slug);

  if (!data) {
    return (
      <>
        <span className="tag">期 間 滿 了</span>
        <h1>공유 링크가 만료되었습니다</h1>
        <p className="lead">
          공유 링크는 三十日間 유효합니다. 새 결과를 만들려면{' '}
          <a href="/diagnose" style={{ color: 'var(--seal)', textDecoration: 'underline' }}>폐업 진단</a> 또는{' '}
          <a href="/resume" style={{ color: 'var(--seal)', textDecoration: 'underline' }}>실패 경력서</a>를 시작하세요.
        </p>
      </>
    );
  }

  const isCalendar = !!data.weeks;
  const isResume = !!data.resumeText;

  return (
    <>
      <span className="tag">共 有 結 果</span>
      <h1>{isCalendar ? '4주 폐업 동행 캘린더' : isResume ? '挑戰 經歷書' : '결과'}</h1>
      <p className="lead">
        {new Date(data.savedAt).toLocaleString('ko-KR')}에 「사장님의 사장님」에서 생성된 결과입니다.
      </p>

      {isCalendar && data.weeks && (
        <div className="calendar-grid">
          {data.weeks.map((w) => (
            <div key={w.week} className="week-card">
              <div className="week-header" data-week={`第 ${['一','二','三','四'][w.week - 1] || w.week} 週`}>
                <span>{w.theme}</span>
              </div>
              <ul>
                {w.items?.map((it, i) => (
                  <li key={i}>
                    <span className={`domain-tag domain-${domainKey(it.domain)}`}>{it.domain}</span>
                    <span className="item-title">{it.title}</span>
                    <span className="dday">{it.dday}</span>
                  </li>
                ))}
              </ul>
              {w.highlight && <div className="week-highlight">★ {w.highlight}</div>}
            </div>
          ))}
        </div>
      )}

      {data.coachMessage && (
        <div className="coach-message">
          <div style={{ fontFamily: 'var(--f-display)', fontWeight: 700, marginBottom: 10, fontSize: 17 }}>
            ◆ 一號 코치 박용군의 한마디
          </div>
          {data.coachMessage}
        </div>
      )}

      {isResume && (<div className="result">{data.resumeText}</div>)}

      <div className="cta-box" style={{ marginTop: 40 }}>
        <h2>본인의 진단 결과가 필요하신가요?</h2>
        <p style={{ fontFamily: 'var(--f-accent)', fontStyle: 'italic', fontSize: 16, color: 'var(--ink-soft)' }}>
          三十秒이면 충분합니다.
        </p>
        <a href="/diagnose" className="cta-link">지금 시작하기 →</a>
      </div>
    </>
  );
}

function domainKey(d) {
  if (d?.includes('신용')) return 'credit';
  if (d?.includes('법무')) return 'legal';
  if (d?.includes('세무')) return 'tax';
  return 'mental';
}
