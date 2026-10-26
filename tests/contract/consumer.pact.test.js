const { PactV3, MatchersV3 } = require('@pact-foundation/pact');
const path = require('path');
const { like } = MatchersV3;

const provider = new PactV3({
  consumer: 'Frontend',
  provider: 'CalculatorAPI',
  dir: path.resolve(process.cwd(), 'pacts'),
});

describe('Contract: Frontend <-> Backend', () => {
  it('POST /api/calculate returns a result', () => {
    provider
      .given('calculator service is up')
      .uponReceiving('an addition request')
      .withRequest({
        method: 'POST',
        path: '/api/calculate',
        headers: { 'Content-Type': 'application/json' },
        body: { a: 45, operator: '+', b: 55 },
      })
      .willRespondWith({
        status: 200,
        body: { result: like(100) },
      });

    return provider.executeTest(async (mockServer) => {
      const res = await fetch(`${mockServer.url}/api/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ a: 45, operator: '+', b: 55 }),
      });
      const data = await res.json();
      expect(data.result).toBe(100);
    });
  });
});