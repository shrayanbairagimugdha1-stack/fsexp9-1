const request = require('supertest');
const app = require('../../app');

describe('REST API integration tests', () => {
  test('GET /health returns UP', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('UP');
  });

  test('POST /api/calculate addition', async () => {
    const res = await request(app)
      .post('/api/calculate')
      .send({ a: 45, operator: '+', b: 55 });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(100);
  });

  test('POST /api/calculate division by zero gives 400', async () => {
    const res = await request(app)
      .post('/api/calculate')
      .send({ a: 100, operator: '/', b: 0 });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Division by zero');
  });
});