const { isAuthorized } = require('../_lib/auth');
const { EDGE_CONFIG_KEYS, setKey } = require('../_lib/edge-config');

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
    const { committees, team, schedule } = await readJsonBody(req);

    if (committees != null) await setKey(EDGE_CONFIG_KEYS.committees, committees);
    if (team != null) await setKey(EDGE_CONFIG_KEYS.team, team);
    if (schedule != null) await setKey(EDGE_CONFIG_KEYS.schedule, schedule);

    res.statusCode = 200;
    res.end(JSON.stringify({ ok: true }));
  } catch (e) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Failed to bootstrap' }));
  }
};
