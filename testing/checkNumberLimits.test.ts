import checkNumberLimits from '../src/utils/checkNumberLimits';

describe('Number limits checker', () => {
  test('0 check', () => {
    const result = checkNumberLimits(0);
    expect(result).toBe(0);
  });
});
