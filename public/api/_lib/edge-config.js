const { get, set } = require('@vercel/edge-config');

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
  await set(key, value);
}

module.exports = {
  EDGE_CONFIG_KEYS,
  getAllData,
  setKey,
};
