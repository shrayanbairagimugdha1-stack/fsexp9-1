const { GenericContainer } = require('testcontainers');

test('Redis container starts (real infrastructure)', async () => {
  const container = await new GenericContainer('redis:7-alpine')
    .withExposedPorts(6379)
    .start();
  expect(container.getMappedPort(6379)).toBeGreaterThan(0);
  await container.stop();
}, 90000);