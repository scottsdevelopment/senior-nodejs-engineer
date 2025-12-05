const USER_AGENT = 'Candidate-Test-Script/1.0';

async function run() {
    const baseUrl = 'https://senior-nodejs-engineer.vercel.app';

    try {
        const cfg = await fetch(`${baseUrl}/api/config`);

        const res = await fetch(`${baseUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json()
    } catch (error) {
        console.error('Error:', error);
    }
}

run();
