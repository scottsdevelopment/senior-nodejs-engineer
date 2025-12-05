const USER_AGENT = 'Candidate-Test-Script/1.0';

async function run() {
    const baseUrl = 'https://senior-nodejs-engineer.vercel.app';

    try {
        // Step 1: Get the config which contains the challenge string
        const configResponse = await fetch(`${baseUrl}/api/config`);

        if (!configResponse.ok) {
            throw new Error(`Failed to fetch config: ${configResponse.status}`);
        }

        const { challenge } = await configResponse.json();

        if (!challenge) {
            throw new Error('No challenge found in config');
        }

        // Step 2: Send the challenge back in a POST request with correct headers
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': USER_AGENT  // This exact User-Agent is required!
            },
            body: JSON.stringify({ challenge })
        });

        if (!response.ok) {
            throw new Error(`POST failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // The successful response contains { flag: "..." }
        console.log('Success! Flag:', data.flag);
        return data.flag;

    } catch (error) {
        console.error('Error:', error.message || error);
        throw error;
    }
}

// Run the script
run();