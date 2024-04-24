import getNumberByDigits from '@utils/getNumberByDigits';

describe('Counter number format testing', () => {
  test('-999 test', () => {
    const result = getNumberByDigits(-999);
    expect(result).toEqual([10, 9, 9, 9]);
  });

  test('-57 test', () => {
    const result = getNumberByDigits(-57);
    expect(result).toEqual([10, 5, 7]);
  });

  test('-6 test', () => {
    const result = getNumberByDigits(-6);
    expect(result).toEqual([10, 0, 6]);
  });

  test('0 test', () => {
    const result = getNumberByDigits(0);
    expect(result).toEqual([0, 0, 0]);
  });

  test('3 test', () => {
    const result = getNumberByDigits(3);
    expect(result).toEqual([0, 0, 3]);
  });

  test('38 test', () => {
    const result = getNumberByDigits(38);
    expect(result).toEqual([0, 3, 8]);
  });

  test('1234567890 test', () => {
    const result = getNumberByDigits(1234567890);
    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  });
});
