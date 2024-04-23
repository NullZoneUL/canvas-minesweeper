import getRandomNumber from './getRandomNumber';
import getBoundaries from './getBoundaries';
import {
  getMapSizeByDifficulty,
  getNumberOfMinesByDifficulty,
} from './difficulty';

const createMap = (difficulty: number) => {
  const mapSize = getMapSizeByDifficulty(difficulty);
  const numberOfMines = getNumberOfMinesByDifficulty(difficulty);
  const map: MapSectionInterface[][] = [];

  for (let i = 0; i < mapSize[1]; i++) {
    map.push([]);
    for (let x = 0; x < mapSize[0]; x++) {
      map[i].push({ mine: false, state: 0, clicked: false, nearbyMines: 0 });
    }
  }

  [...Array(numberOfMines)].forEach(() => {
    const maxY = mapSize[1] - 1;
    const maxX = mapSize[0] - 1;
    let y = getRandomNumber(0, maxY);
    let x = getRandomNumber(0, maxX);

    while (!!map[y][x]?.mine) {
      y = getRandomNumber(0, maxY);
      x = getRandomNumber(0, maxX);
    }

    getBoundaries(
      x,
      y,
      mapSize,
      (x_: number, y_: number) => map[y_][x_].nearbyMines++,
    );

    map[y][x].mine = true;
  });

  return map;
};

export default createMap;
