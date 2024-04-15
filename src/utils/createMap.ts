import getRandomNumber from './getRandomNumber';
import { difficultySizes, minesByDifficulty } from './difficulty';

const createMap = (difficulty: number) => {
  const mapSize = difficultySizes[difficulty];
  const map: MapSectionInterface[][] = [];

  for (let i = 0; i < mapSize[1]; i++) {
    map.push([]);
    for (let x = 0; x < mapSize[0]; x++) {
      map[i].push({ mine: false, state: 0 });
    }
  }

  [...Array(minesByDifficulty[difficulty])].forEach(() => {
    const maxY = mapSize[1] - 1;
    const maxX = mapSize[0] - 1;
    let y = getRandomNumber(0, maxY);
    let x = getRandomNumber(0, maxX);

    while (!!map[y][x]?.mine) {
      y = getRandomNumber(0, maxY);
      x = getRandomNumber(0, maxX);
    }

    map[y][x].mine = true;
  });

  return map;
};

export default createMap;
