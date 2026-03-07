const { isAuthorized } = require('../_lib/auth');
const { setKey } = require('../_lib/edge-config');

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 2_000_000) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  if (!isAuthorized(req)) {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: 'Unauthorized' }));
    return;
  }

  try {
    const { key, value } = await readJsonBody(req);

    if (!key) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Missing key' }));
      return;
    }

    await setKey(key, value);

    res.statusCode = 200;
    res.end(JSON.stringify({ ok: true }));
  } catch (e) {
    const statusCode = e.statusCode || e.status || 500;
    const message = (e && (e.message || e.toString && e.toString())) || 'Unknown error';
    res.statusCode = statusCode;
    res.end(JSON.stringify({
      error: statusCode === 500 ? 'Failed to update' : message,
      details: statusCode === 500 ? message : undefined,
      statusCode,
    }));
  }
};
