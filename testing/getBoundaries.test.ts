import getBoundaries from '@utils/getBoundaries';
import { getMapSizeByDifficulty } from '@/utils/difficulty';

describe('Get item boundaries test', () => {
  const mapSize = getMapSizeByDifficulty(0);
  let boundaries: Array<{ x: number; y: number }>;

  beforeEach(() => {
    boundaries = [];
  });

  test('Boundaries from top, left corner', () => {
    getBoundaries(0, 0, mapSize, (x: number, y: number) =>
      boundaries.push({ x, y }),
    );
    expect(boundaries).toEqual([
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]);
  });

  test('Boundaries from top, left corner y+1', () => {
    getBoundaries(0, 1, mapSize, (x: number, y: number) =>
      boundaries.push({ x, y }),
    );
    expect(boundaries).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
    ]);
  });

  test('Boundaries from top, right corner', () => {
    getBoundaries(7, 0, mapSize, (x: number, y: number) =>
      boundaries.push({ x, y }),
    );
    expect(boundaries).toEqual([
      { x: 6, y: 0 },
      { x: 6, y: 1 },
      { x: 7, y: 1 },
    ]);
  });

  test('Boundaries from top, right corner y+1', () => {
    getBoundaries(7, 1, mapSize, (x: number, y: number) =>
      boundaries.push({ x, y }),
    );
    expect(boundaries).toEqual([
      { x: 6, y: 0 },
      { x: 7, y: 0 },
      { x: 6, y: 1 },
      { x: 6, y: 2 },
      { x: 7, y: 2 },
    ]);
  });

  test('Boundaries from bottom, left corner', () => {
    getBoundaries(0, 7, mapSize, (x: number, y: number) =>
      boundaries.push({ x, y }),
    );
    expect(boundaries).toEqual([
      { x: 0, y: 6 },
      { x: 1, y: 6 },
      { x: 1, y: 7 },
    ]);
  });

  test('Boundaries from bottom, left corner y-1', () => {
    getBoundaries(0, 6, mapSize, (x: number, y: number) =>
      boundaries.push({ x, y }),
    );
    expect(boundaries).toEqual([
      { x: 0, y: 5 },
      { x: 1, y: 5 },
      { x: 1, y: 6 },
      { x: 0, y: 7 },
      { x: 1, y: 7 },
    ]);
  });

  test('Boundaries from bottom, right corner', () => {
    getBoundaries(7, 7, mapSize, (x: number, y: number) =>
      boundaries.push({ x, y }),
    );
    expect(boundaries).toEqual([
      { x: 6, y: 6 },
      { x: 7, y: 6 },
      { x: 6, y: 7 },
    ]);
  });

  test('Boundaries from bottom, right corner y-1', () => {
    getBoundaries(7, 6, mapSize, (x: number, y: number) =>
      boundaries.push({ x, y }),
    );
    expect(boundaries).toEqual([
      { x: 6, y: 5 },
      { x: 7, y: 5 },
      { x: 6, y: 6 },
      { x: 6, y: 7 },
      { x: 7, y: 7 },
    ]);
  });

  test('Boundaries from item in the middle', () => {
    getBoundaries(3, 3, mapSize, (x: number, y: number) =>
      boundaries.push({ x, y }),
    );
    expect(boundaries).toEqual([
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 4, y: 2 },
      { x: 2, y: 3 },
      { x: 4, y: 3 },
      { x: 2, y: 4 },
      { x: 3, y: 4 },
      { x: 4, y: 4 },
    ]);
  });
});
