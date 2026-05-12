import { saveResult, getResult, generateSlug } from '../../../../lib/kv';

export async function POST(req) {
  try {
    const data = await req.json();
    if (!data || JSON.stringify(data).length > 8000) {
      return Response.json({ error: '데이터 크기 초과 또는 비어있음' }, { status: 400 });
    }
    const slug = generateSlug();
    await saveResult(slug, { ...data, savedAt: Date.now() });
    return Response.json({ slug });
  } catch (err) {
    return Response.json({ error: err.message || '저장 실패' }, { status: 500 });
  }
}

export async function GET(_req, { params }) {
  try {
    const { slug } = await params;
    const data = await getResult(slug);
    if (!data) return Response.json({ error: '만료되었거나 존재하지 않는 링크' }, { status: 404 });
    return Response.json(data);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
