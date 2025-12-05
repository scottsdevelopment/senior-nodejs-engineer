import configHandler from './api/config.js';
import targetHandler from './api/target.js';

// Mock Response object
class MockRes {
    constructor() {
        this.statusCode = 200;
        this.jsonData = null;
    }

    status(code) {
        this.statusCode = code;
        return this;
    }

    json(data) {
        this.jsonData = data;
        return this;
    }
}

async function runTests() {
    console.log('--- Testing /api/config ---');

    // Test 1: Invalid User-Agent
    let req = { headers: { 'user-agent': 'Bad-Agent' } };
    let res = new MockRes();
    await configHandler(req, res);
    console.log('Test 1 (Invalid UA):', res.statusCode === 403 ? 'PASS' : 'FAIL', res.jsonData);

    // Test 2: Valid User-Agent
    req = { headers: { 'user-agent': 'Candidate-Test-Script/1.0' } };
    res = new MockRes();
    await configHandler(req, res);
    console.log('Test 2 (Valid UA):', res.statusCode === 200 ? 'PASS' : 'FAIL', res.jsonData);
    const config = res.jsonData;

    console.log('\n--- Testing /api/target ---');

    // Test 3: Invalid User-Agent
    req = { headers: { 'user-agent': 'Bad-Agent' } };
    res = new MockRes();
    await targetHandler(req, res);
    console.log('Test 3 (Invalid UA):', res.statusCode === 403 ? 'PASS' : 'FAIL', res.jsonData);

    // Test 4: Missing Authorization
    req = { headers: { 'user-agent': 'Candidate-Test-Script/1.0' } };
    res = new MockRes();
    await targetHandler(req, res);
    console.log('Test 4 (Missing Auth):', res.statusCode === 403 ? 'PASS' : 'FAIL', res.jsonData);

    // Test 5: Incorrect Authorization
    req = { headers: { 'user-agent': 'Candidate-Test-Script/1.0', 'authorization': 'Bearer Wrong' } };
    res = new MockRes();
    await targetHandler(req, res);
    console.log('Test 5 (Wrong Auth):', res.statusCode === 403 ? 'PASS' : 'FAIL', res.jsonData);

    // Test 6: Correct Authorization
    req = { headers: { 'user-agent': 'Candidate-Test-Script/1.0', 'authorization': config.requiredHeader } };
    res = new MockRes();
    await targetHandler(req, res);
    console.log('Test 6 (Correct Auth):', res.statusCode === 200 ? 'PASS' : 'FAIL', res.jsonData);
}

runTests();
