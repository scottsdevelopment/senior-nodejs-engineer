const USER_AGENT = 'Candidate-Test-Script/1.0';

async function run() {
    const baseUrl = 'https://senior-nodejs-engineer.vercel.app';

    try {
        const cfg = await fetch(`${baseUrl}/api/config`, {
            headers: { 'User-Agent': USER_AGENT }
        }).then(r => r.json());

        console.log('Config received:', cfg);

        // Submit token
        const res = await fetch(`${baseUrl}${cfg.target}`, {
            method: cfg.method,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': USER_AGENT,
                ...cfg.headers
            },
            body: JSON.stringify(cfg.body)
        });

        const data = await res.json();
        console.log('API Response:', data);
    } catch (error) {
        console.error('Error:', error);
    }
}

run();
