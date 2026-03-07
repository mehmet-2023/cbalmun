const { get } = require('@vercel/edge-config');

const EDGE_CONFIG_KEYS = {
  committees: 'committees',
  team: 'team',
  schedule: 'schedule',
};

async function getAllData() {
  const [committees, team, schedule] = await Promise.all([
    get(EDGE_CONFIG_KEYS.committees),
    get(EDGE_CONFIG_KEYS.team),
    get(EDGE_CONFIG_KEYS.schedule),
  ]);

  return {
    committees: committees ?? null,
    team: team ?? null,
    schedule: schedule ?? null,
  };
}

async function setKey(key, value) {
  if (!Object.values(EDGE_CONFIG_KEYS).includes(key)) {
    const err = new Error('Unknown key');
    err.statusCode = 400;
    throw err;
  }

  const edgeConfigId = process.env.VERCEL_EDGE_CONFIG_ID;
  const vercelToken = process.env.VERCEL_API_TOKEN;

  if (!edgeConfigId) {
    const err = new Error('Missing VERCEL_EDGE_CONFIG_ID');
    err.statusCode = 500;
    throw err;
  }

  if (!vercelToken) {
    const err = new Error('Missing VERCEL_API_TOKEN');
    err.statusCode = 500;
    throw err;
  }

  const url = `https://api.vercel.com/v1/edge-config/${encodeURIComponent(edgeConfigId)}/items`;
  const resp = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${vercelToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: [{ operation: 'upsert', key, value }],
    }),
  });

  const json = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    const msg = json.error?.message || json.error || resp.statusText || 'Edge Config update failed';
    const err = new Error(msg);
    err.statusCode = resp.status;
    throw err;
  }
}

module.exports = {
  EDGE_CONFIG_KEYS,
  getAllData,
  setKey,
};
