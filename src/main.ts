import createMap from './utils/createMap';
import { difficultySizes } from './utils/difficulty';
import { sectionSize, borderSize, headerSize } from './utils/sizes';
import { uncheckedSectionImage } from './utils/images';
import './style.css';

const canvas = document.getElementById('layout') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

let map: MapSectionInterface[][] = [];

const setSizeByDifficulty = (difficulty: number) => {
  const sizes = difficultySizes[difficulty];
  if (!sizes) {
    return;
  }

  canvas.width = sizes[0] * sectionSize + borderSize * 2;
  canvas.height = sizes[1] * sectionSize + headerSize + borderSize;
  ctx.fillStyle = '#bdbdbd';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const printMap = () => {
  let x = borderSize;
  let y = headerSize;
  map.forEach(row => {
    row.forEach(section => {
      //TODO!! Change image by the section state
      ctx.drawImage(uncheckedSectionImage, x, y, sectionSize, sectionSize);
      x += sectionSize;
    });
    y += sectionSize;
    x = borderSize;
  });
};

const loadGame = (difficulty: number) => {
  setSizeByDifficulty(difficulty);
  map = createMap(difficulty);
  printMap();
};

const displayHideButton = () => {
  console.log('Button clicked!!');
};

loadGame(0);

export { displayHideButton };
