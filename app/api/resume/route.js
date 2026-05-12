import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    const { name, industry, years, closeReason, learned, nextPlan } = await req.json();

    const prompt = `당신은 한국 자영업 재도전 전문 카운슬러입니다. 폐업한 사장님의 정보를 받아 정부 재도전 펀드·소상공인진흥공단 정책자금·재창업 패키지 신청용 "도전 경력서"를 작성합니다.

[입력 정보]
- 이름: ${name || '(미입력)'}
- 업종: ${industry}
- 운영 연차: ${years}년
- 폐업 사유: ${closeReason || '(미입력)'}
- 배운 점·강점: ${learned || '(미입력)'}
- 다음 도전 방향: ${nextPlan || '(미입력)'}

[작성 규칙]
1. 문서 제목: "도전 경력서 — ${name || '(이름)'}"
2. 다음 5개 섹션을 순서대로:
   ① 운영 요약 (1~2줄, 연차·업종·규모 핵심)
   ② 도전한 것 (운영 중 시도·달성·강점을 긍정적으로 재구성)
   ③ 잘 끝낸 것 (폐업 사유를 책임감 있게, 그러나 비난받지 않게 정리)
   ④ 배운 것 (구체적 교훈 3가지, 번호로)
   ⑤ 다음 도전 (재도전 의지·계획, 1~2문단)
3. 톤: 패배자 어조 절대 금지. 졸업·전환·축적의 어조.
4. 정부 심사위원이 읽었을 때 "이 사람에게 재도전 펀드를 줄 만하다"고 판단할 수준의 객관성·진정성.
5. 마지막에 "발급 확인" 줄 추가: "본 도전 경력서는 「사장님의 사장님」 폐업 동행 4주 패키지 수료자 자동 발급 양식입니다."

깔끔한 텍스트로 출력. 마크다운 기호(#, **, -) 사용 금지. 섹션 제목은 「① 운영 요약」 형태로.`;

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
