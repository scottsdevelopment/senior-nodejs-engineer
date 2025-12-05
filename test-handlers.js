import configHandler from './api/config.js';
import targetHandler from './api/target.js';

// Mock Response object
class MockRes {
    constructor() {
        this.statusCode = 200;
        this.jsonData = null;
        this.sentData = null;
    }

    status(code) {
        this.statusCode = code;
        return this;
    }

    json(data) {
        this.jsonData = data;
        return this;
    }

    send(data) {
        this.sentData = data;
        return this;
    }
}

async function runTests() {
    console.log('--- Testing /api/config ---');

    // Test 1: Invalid User-Agent
    let req = { headers: { 'user-agent': 'Bad-Agent' } };
    let res = new MockRes();
    await configHandler(req, res);
    console.log('Test 1 (Invalid UA):', res.statusCode === 404 ? 'PASS' : 'FAIL', res.sentData);

    // Test 2: Valid User-Agent
    req = { headers: { 'user-agent': 'Candidate-Test-Script/1.0' } };
    res = new MockRes();
    await configHandler(req, res);
    console.log('Test 2 (Valid UA):', res.statusCode === 200 ? 'PASS' : 'FAIL', res.jsonData);
    const config = res.jsonData;

    console.log('\n--- Testing /api/target ---');

    // Test 2.5: Invalid Method (GET)
    req = { method: 'GET', headers: { 'user-agent': 'Candidate-Test-Script/1.0' } };
    res = new MockRes();
    await targetHandler(req, res);
    console.log('Test 2.5 (Invalid Method):', res.statusCode === 405 ? 'PASS' : 'FAIL', res.jsonData);

    // Test 3: Invalid User-Agent
    req = { method: 'POST', headers: { 'user-agent': 'Bad-Agent' } };
    res = new MockRes();
    await targetHandler(req, res);
    console.log('Test 3 (Invalid UA):', res.statusCode === 404 ? 'PASS' : 'FAIL', res.sentData);

    // Test 4: Missing Authorization
    req = { method: 'POST', headers: { 'user-agent': 'Candidate-Test-Script/1.0' } };
    res = new MockRes();
    await targetHandler(req, res);
    console.log('Test 4 (Missing Auth):', res.statusCode === 403 ? 'PASS' : 'FAIL', res.jsonData);

    // Test 5: Incorrect Authorization
    req = { method: 'POST', headers: { 'user-agent': 'Candidate-Test-Script/1.0', 'authorization': 'Bearer Wrong' } };
    res = new MockRes();
    await targetHandler(req, res);
    console.log('Test 5 (Wrong Auth):', res.statusCode === 403 ? 'PASS' : 'FAIL', res.jsonData);

    // Test 5.5: Correct Auth, Invalid Token
    req = {
        method: 'POST',
        headers: { 'user-agent': 'Candidate-Test-Script/1.0', 'authorization': 'Bearer SECRET-123' },
        body: { token: 'WRONG_TOKEN' }
    };
    res = new MockRes();
    await targetHandler(req, res);
    console.log('Test 5.5 (Invalid Token):', res.statusCode === 400 ? 'PASS' : 'FAIL', res.jsonData);

    // Test 6: Correct Authorization and Token
    const authHeader = config.headers ? config.headers.find(h => h.key === 'Authorization') : null;
    const authValue = authHeader ? authHeader.value : 'MISSING_IN_CONFIG';
    const token = config.body ? config.body.token : 'MISSING_TOKEN';

    req = {
        method: 'POST',
        headers: { 'user-agent': 'Candidate-Test-Script/1.0', 'authorization': authValue },
        body: { token: token }
    };
    res = new MockRes();
    await targetHandler(req, res);
    console.log('Test 6 (Correct Auth & Token):', res.statusCode === 200 ? 'PASS' : 'FAIL', res.jsonData);
}

runTests();
