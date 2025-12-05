const USER_AGENT = 'Candidate-Test-Script/1.0';

async function run() {
    const baseUrl = 'https://senior-nodejs-engineer.vercel.app';

    try {
        // Step 1: Fetch config with User-Agent header
        const cfgRes = await fetch(`${baseUrl}/api/config`, {
            headers: {
                'User-Agent': USER_AGENT
            }
        });
        const cfg = await cfgRes.json();
        console.log('Config fetched:', cfg);

        // Step 2: POST to the target endpoint with required headers and token in body
        const postRes = await fetch(`${baseUrl}${cfg.target}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': USER_AGENT,
                'Authorization': cfg.requiredHeader
            },
            body: JSON.stringify({ token: cfg.token })
        });

        if (!postRes.ok) {
            throw new Error(`POST failed: ${postRes.status} ${postRes.statusText}`);
        }

        const data = await postRes.json();
        console.log('Response data:', data);  // This should contain the solution/flag

        // If the response has a flag (common in puzzles), highlight it
        if (data.flag || data.solution) {
            console.log('Puzzle solved! Flag/Solution:', data.flag || data.solution);
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
}

run();