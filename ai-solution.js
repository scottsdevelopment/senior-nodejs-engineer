await fetch("https://senior-nodejs-engineer.vercel.app/api/config", { headers: { 'User-Agent': 'Candidate-Test-Script/1.0' } });
const r = await fetch("https://senior-nodejs-engineer.vercel.app", { headers: { 'User-Agent': 'Candidate-Test-Script/1.0' } });
console.log(await r.json());