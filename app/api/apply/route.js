export async function POST(req) {
  try {
    const body = await req.json();
    console.log('[APPLY]', new Date().toISOString(), body);
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ error: err.message || '서버 오류' }, { status: 500 });
  }
}
