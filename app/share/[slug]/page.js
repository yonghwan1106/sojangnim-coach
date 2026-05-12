import { getResult } from '../../../lib/kv';

export const dynamic = 'force-dynamic';

export default async function SharePage({ params }) {
  const { slug } = await params;
  const data = await getResult(slug);

  if (!data) {
    return (
      <>
        <h1>공유 링크가 만료되었습니다</h1>
        <p className="lead">
          공유 링크는 30일간 유효합니다. 새 결과를 만들려면{' '}
          <a href="/diagnose" style={{ color: 'var(--accent)' }}>폐업 진단</a> 또는{' '}
          <a href="/resume" style={{ color: 'var(--accent)' }}>실패 경력서</a>를 시작하세요.
        </p>
      </>
    );
  }

  const isCalendar = !!data.weeks;
  const isResume = !!data.resumeText;

  return (
    <>
      <span className="tag">공유된 결과</span>
      <h1>{isCalendar ? '4주 폐업 동행 캘린더' : isResume ? '도전 경력서' : '결과'}</h1>
      <p className="lead">
        {new Date(data.savedAt).toLocaleString('ko-KR')}에 「사장님의 사장님」에서 생성된 결과입니다.
      </p>

      {isCalendar && data.weeks && (
        <div className="calendar-grid">
          {data.weeks.map((w) => (
            <div key={w.week} className="week-card">
              <div className="week-header">Week {w.week} · {w.theme}</div>
              <ul>
                {w.items?.map((it, i) => (
                  <li key={i}>
                    <span className={`domain-tag domain-${domainKey(it.domain)}`}>{it.domain}</span>
                    {it.title} <span className="dday">{it.dday}</span>
                  </li>
                ))}
              </ul>
              {w.highlight && <div className="week-highlight">★ {w.highlight}</div>}
            </div>
          ))}
        </div>
      )}

      {isResume && (
        <div className="result">{data.resumeText}</div>
      )}

      <div style={{ marginTop: 32, padding: 16, background: '#fff7ed', borderRadius: 8, fontSize: 14 }}>
        본인의 진단 결과가 필요하신가요?{' '}
        <a href="/diagnose" style={{ color: 'var(--accent)', fontWeight: 600 }}>지금 시작하기 →</a>
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
