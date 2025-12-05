export default function handler(req, res) {
  const allowedUserAgent = 'Candidate-Test-Script/1.0';
  if (req.headers['user-agent'] !== allowedUserAgent) {
    return res.status(403).json({ error: 'Invalid User-Agent' });
  }

  res.status(200).json({
    requiredHeader: 'Bearer SECRET-123',
    token: 'abc123',
    target: '/api/target'
  });
}
