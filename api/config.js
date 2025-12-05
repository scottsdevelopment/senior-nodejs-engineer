export default function handler(req, res) {
    const allowedUserAgent = 'Candidate-Test-Script/1.0';
    if (req.headers['user-agent'] !== allowedUserAgent) {
        return res.status(404).send('Not Found');
    }

    res.status(200).json({
        message: 'Request to the "target" endpoint with the correct headers and JSON body will yield the secret key.',
        headers: [{
            'key': 'Authorization',
            'value': 'Bearer SECRET-123'
        }],
        target: '/api/target',
        method: 'POST',
        body: {
            token: 'SENIOR-LEVEL-TEST'
        }
    });
}
