const { calculate } = require('../../calculator');

describe('Calculator unit tests', () => {
  test('addition', () => expect(calculate(45, '+', 55)).toBe(100));
  test('subtraction', () => expect(calculate(10, '-', 4)).toBe(6));
  test('multiplication', () => expect(calculate(12, '*', 12)).toBe(144));
  test('division', () => expect(calculate(10, '/', 2)).toBe(5));
  test('division by zero throws', () => {
    expect(() => calculate(100, '/', 0)).toThrow('Division by zero');
  });
  test('invalid operator throws', () => {
    expect(() => calculate(1, '%', 2)).toThrow('Invalid operator');
  });
});