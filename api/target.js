export default function handler(req, res) {
    const allowedUserAgent = 'Candidate-Test-Script/1.0';
    if (req.headers['user-agent'] !== allowedUserAgent) {
        return res.status(404).send('Not Found');
    }

    const auth = req.headers['authorization'] || '';
    if (auth === 'Bearer SECRET-123') {
        res.status(200).json({ success: true, message: 'Stage 2 unlocked!' });
    } else {
        res.status(403).json({ success: false, message: 'Authorization missing or incorrect.' });
    }
}
