const USER_AGENT = 'Candidate-Test-Script/1.0';

async function run() {
    const baseUrl = 'https://senior-nodejs-engineer.vercel.app';

    try {
        await fetch(`${baseUrl}/api/config`);
        await fetch(`${baseUrl}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

run();
