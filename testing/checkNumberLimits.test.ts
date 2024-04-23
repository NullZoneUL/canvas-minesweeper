import checkNumberLimits from '@utils/checkNumberLimits';

describe('Number limits checker', () => {
  test('0 check', () => {
    const result = checkNumberLimits(0);
    expect(result).toBe(0);
  });

  test('< -999 check', () => {
    const result = checkNumberLimits(-1000);
    expect(result).toBe(-999);
  });

  test('> 999 check', () => {
    const result = checkNumberLimits(1000);
    expect(result).toBe(999);
  });
});
