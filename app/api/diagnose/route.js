import Anthropic from '@anthropic-ai/sdk';
import { ALL_PROCEDURES } from '../../../lib/procedures';
import { checkRateLimit, getClientIp } from '../../../lib/rateLimit';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    const ip = getClientIp(req);
    const limit = checkRateLimit(ip);
    if (!limit.allowed) {
      const minutes = Math.ceil((limit.resetAt - Date.now()) / 60000);
      return Response.json(
        { error: `요청이 많아 잠시 후 다시 시도해주세요. (약 ${minutes}분 후 가능)` },
        { status: 429 }
      );
    }

    const { industry, years, employees, rented, debt, extra, tone = 'formal' } = await req.json();

    const proceduresList = ALL_PROCEDURES
      .map((p, i) => `${i + 1}. [${p.domain}] ${p.title}`)
      .join('\n');

    const toneInstruction = tone === 'kakao'
      ? '\n\n[어조] coachMessage와 highlight는 박용군 코치가 친한 후배 사장님에게 보내는 카카오톡 메시지처럼 친근하게. 반말, 줄바꿈, 이모지 1~2개. items의 title은 그대로 유지.'
      : '\n\n[어조] 정중한 공식 문서체. 존댓말, 명료한 행정 용어.';

    const prompt = `당신은 한국 자영업 폐업 전문 동행 코치입니다. 폐업 직전 사장님의 상황을 듣고, 30개 절차 중 본인에게 해당하는 18~22개를 골라 4주 캘린더로 정리해주세요.

[사장님 상황]
- 업종: ${industry}
- 운영 연차: ${years}년
- 직원 수: ${employees}명
- 임대 상황: ${rented === 'yes' ? '상가 임대 중' : rented === 'own' ? '본인 소유' : '전대'}
- 부채 수준: ${debt === 'low' ? '3천만 원 이하' : debt === 'medium' ? '3천~1억 원' : '1억 원 이상'}
- 추가 상황: ${extra || '(없음)'}

[30개 절차 풀]
${proceduresList}

[작성 규칙]
1. Week1(긴급/통보) → Week2(법무·계약) → Week3(세무·재무) → Week4(심리·재출발) 순서
2. 본인에게 해당 안 되는 항목(예: 직원 0명이면 4대보험 상실신고 제외)은 제외
3. 각 항목에 D-day(D-25, D-18 등) 부여
4. 각 Week에 "이번 주 핵심 1줄" highlight 작성
5. 마지막에 박용군 코치 한마디 작성 (평택 족발 폐업 경험 반영, 2~3줄)${toneInstruction}

[출력 형식 — 반드시 아래 JSON만 출력. 마크다운 코드블록 사용 금지]
{
  "weeks": [
    {
      "week": 1,
      "theme": "긴급 통보 + 신용 사전상담",
      "items": [
        { "title": "신용회복위원회 사전상담 신청", "dday": "D-28", "domain": "신용회복" },
        { "title": "임대차 해지 통보", "dday": "D-25", "domain": "법무" }
      ],
      "highlight": "이번 주는 신용 사전상담과 임대인 통보가 핵심입니다."
    }
  ],
  "coachMessage": "박용군 코치 한마디"
}`;

    const msg = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2500,
      messages: [{ role: 'user', content: prompt }],
    });

    const raw = msg.content[0]?.text || '';
    const parsed = parseJson(raw);

    if (parsed) {
      return Response.json({ ok: true, data: parsed, raw });
    }
    return Response.json({ ok: true, data: null, raw, parseError: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message || '서버 오류' }, { status: 500 });
  }
}

function parseJson(text) {
  if (!text) return null;
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf('{');
  const end = candidate.lastIndexOf('}');
  if (start < 0 || end < 0) return null;
  try {
    return JSON.parse(candidate.slice(start, end + 1));
  } catch {
    return null;
  }
}
