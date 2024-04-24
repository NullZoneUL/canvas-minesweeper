import getRandomNumber from '@utils/getRandomNumber';

const testFunction = (numberA: number, numberB: number) => {
  [...Array(100)].forEach(() => {
    const result = getRandomNumber(numberA, numberB);
    expect(result).toBeGreaterThanOrEqual(numberA);
    expect(result).toBeLessThanOrEqual(numberB);
  });
};

describe('Get a random number between two numbers test', () => {
  test('0 to 100, 100 tests', () => {
    testFunction(0, 100);
  });

  test('-100 to 50, 100 tests', () => {
    testFunction(-100, 50);
  });

  test('Incorrect range test', () => {
    const result = getRandomNumber(10, 0);
    expect(result).toBe(NaN);
  });
});
