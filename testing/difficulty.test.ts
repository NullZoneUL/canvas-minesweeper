import {
  getMapSizeByDifficulty,
  getNumberOfMinesByDifficulty,
} from '@utils/difficulty';

describe('Properties by difficulty testing', () => {
  const difficultySizes = [
    [8, 8],
    [16, 16],
    [32, 16],
  ];
  const minesByDifficulty = [10, 40, 99];

  test('Map size testing', () => {
    expect(getMapSizeByDifficulty(-10)).toEqual(difficultySizes[0]);
    expect(getMapSizeByDifficulty(-1)).toEqual(difficultySizes[0]);
    expect(getMapSizeByDifficulty(0)).toEqual(difficultySizes[0]);
    expect(getMapSizeByDifficulty(1)).toEqual(difficultySizes[1]);
    expect(getMapSizeByDifficulty(2)).toEqual(difficultySizes[2]);
    expect(getMapSizeByDifficulty(3)).toEqual(difficultySizes[2]);
    expect(getMapSizeByDifficulty(10)).toEqual(difficultySizes[2]);
  });

  test('Number of mines testing', () => {
    expect(getNumberOfMinesByDifficulty(-10)).toEqual(minesByDifficulty[0]);
    expect(getNumberOfMinesByDifficulty(-1)).toEqual(minesByDifficulty[0]);
    expect(getNumberOfMinesByDifficulty(0)).toEqual(minesByDifficulty[0]);
    expect(getNumberOfMinesByDifficulty(1)).toEqual(minesByDifficulty[1]);
    expect(getNumberOfMinesByDifficulty(2)).toEqual(minesByDifficulty[2]);
    expect(getNumberOfMinesByDifficulty(3)).toEqual(minesByDifficulty[2]);
    expect(getNumberOfMinesByDifficulty(10)).toEqual(minesByDifficulty[2]);
  });
});
