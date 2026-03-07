function getRequestPassphrase(req) {
  const header = req.headers['x-admin-passphrase'];
  if (typeof header === 'string' && header.trim()) return header.trim();

  const auth = req.headers['authorization'];
  if (typeof auth === 'string' && auth.toLowerCase().startsWith('bearer ')) {
    const token = auth.slice('bearer '.length).trim();
    if (token) return token;
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
