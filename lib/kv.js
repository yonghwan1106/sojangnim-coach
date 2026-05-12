const memoryStore = new Map();
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

let kvClient = null;
async function getKv() {
  if (kvClient !== null) return kvClient;
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    kvClient = false;
    return false;
  }
  try {
    const mod = await import('@vercel/kv');
    kvClient = mod.kv;
    return kvClient;
  } catch {
    kvClient = false;
    return false;
  }
}

export function generateSlug() {
  return Math.random().toString(36).slice(2, 10);
}

export async function saveResult(slug, data) {
  const kv = await getKv();
  if (kv) {
    await kv.set(`share:${slug}`, JSON.stringify(data), { ex: 30 * 24 * 60 * 60 });
    return true;
  }
  memoryStore.set(slug, { data, expiresAt: Date.now() + TTL_MS });
  return true;
}

export async function getResult(slug) {
  const kv = await getKv();
  if (kv) {
    const raw = await kv.get(`share:${slug}`);
    if (!raw) return null;
    return typeof raw === 'string' ? JSON.parse(raw) : raw;
  }
  const entry = memoryStore.get(slug);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    memoryStore.delete(slug);
    return null;
  }
  return entry.data;
}
