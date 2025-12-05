export default function handler(req, res) {
    const allowedUserAgent = 'Candidate-Test-Script/1.0';
    if (req.headers['user-agent'] !== allowedUserAgent) {
        return res.status(404).send('Not Found');
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: `Incorrect method ${req.method}, expected POST` });
    }

    const auth = req.headers['authorization'] || '';
    if (auth === 'Bearer SECRET-123') {
        const body = req.body || {};
        if (body.token === 'SENIOR-LEVEL-TEST') {
            res.status(200).json({ success: true, message: 'Reply to this post with "SENIOR"' });
        } else {
            res.status(400).json({ success: false, message: 'Invalid or missing token in body.' });
        }
    } else {
        res.status(403).json({ success: false, message: 'Authorization missing or incorrect.' });
    }
}
