import createMap from '@utils/createMap';
import {
  getMapSizeByDifficulty,
  getNumberOfMinesByDifficulty,
} from '@utils/difficulty';

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

const testFunction = (difficulty: number) => {
  const mapSize = getMapSizeByDifficulty(difficulty);
  const mines = getNumberOfMinesByDifficulty(difficulty);

  [...Array(100)].forEach(() => {
    const clickX = getRandomInt(mapSize[0] - 1);
    const clickY = getRandomInt(mapSize[1] - 1);
    const map = createMap(difficulty, clickX, clickY);
    let numMapMines = 0;

    map.forEach(arrow => arrow.forEach(item => item.mine && numMapMines++));
    expect(mapSize).toEqual([map[0]?.length, map.length]);
    expect(mines).toEqual(numMapMines);
    expect(map[clickY][clickX].mine).toBe(false);
  });
};

describe('Map creator checker', () => {
  test('Check 100 maps with difficulty 0', () => {
    testFunction(0);
  });

  test('Check 100 maps with difficulty 1', () => {
    testFunction(1);
  });

  test('Check 100 maps with difficulty 2', () => {
    testFunction(2);
  });

  test('Check 100 maps with non-existent difficulty 3', () => {
    testFunction(3);
  });

  test('Check 100 maps with non-existent difficulty -1', () => {
    testFunction(-1);
  });
});
