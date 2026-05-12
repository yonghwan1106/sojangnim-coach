import Anthropic from '@anthropic-ai/sdk';
import { ALL_PROCEDURES } from '../../../lib/procedures';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    const { industry, years, employees, rented, debt, extra } = await req.json();

    const proceduresList = ALL_PROCEDURES
      .map((p, i) => `${i + 1}. [${p.domain}] ${p.title}`)
      .join('\n');

    const prompt = `당신은 한국 자영업 폐업 전문 동행 코치입니다. 폐업 직전 사장님의 상황을 듣고, 30개 절차 중 본인에게 해당하는 18~22개를 골라 4주 캘린더(Week1~Week4)로 정리해주세요.

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
1. Week1(긴급/통보) → Week2(법무·계약) → Week3(세무·재무) → Week4(심리·재출발) 순서로 자연스럽게 분배
2. 각 항목 앞에 □ 체크박스, 뒤에 (D-XX) 일정 표기
3. 본인에게 해당 안 되는 항목(예: 직원 0명이면 4대보험 상실신고 제외)은 과감히 제외
4. 각 Week 마지막에 "이번 주 핵심 1줄"을 ★로 강조
5. 마지막에 "1호 코치 박용군의 한마디" (2~3줄, 평택 족발 폐업 경험에서 우러난 조언)

깔끔한 텍스트로 출력하세요. 마크다운 사용 금지.`;

    const msg = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = msg.content[0]?.text || '응답이 비어있습니다.';
    return Response.json({ text });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message || '서버 오류' }, { status: 500 });
  }
}
