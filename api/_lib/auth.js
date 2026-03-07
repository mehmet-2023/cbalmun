function getRequestPassphrase(req) {
  const header = req.headers['x-admin-passphrase'] ?? req.headers['X-Admin-Passphrase'] ?? req.headers['x-admin-passphrase'.toLowerCase()];
  if (Array.isArray(header) && header[0] && String(header[0]).trim()) return String(header[0]).trim();
  if (typeof header === 'string' && header.trim()) return header.trim();

  const auth = req.headers['authorization'];
  if (typeof auth === 'string' && auth.toLowerCase().startsWith('bearer ')) {
    const token = auth.slice('bearer '.length).trim();
    if (token) return token;
  }

  try {
    const url = new URL(req.url, 'http://localhost');
    const token = url.searchParams.get('token');
    if (token && token.trim()) return token.trim();
  } catch (e) {
    // ignore
  }

  return null;
}

function isAuthorized(req) {
  const expected = process.env.ADMIN_PASSPHRASE;
  if (!expected) return false;

  const provided = getRequestPassphrase(req);
  if (!provided) return false;

  return provided === expected;
}

module.exports = {
  isAuthorized,
};
