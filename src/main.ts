import createMap from './utils/createMap';
import checkNumberLimits from './utils/checkNumberLimits';
import getNumberByDigits from './utils/getNumberByDigits';
import { difficultySizes, minesByDifficulty } from './utils/difficulty';
import {
  sectionSize,
  borderSize,
  headerSize,
  counterHeight,
  counterWidth,
} from './utils/sizes';
import { uncheckedSectionImage, imageNumbers } from './utils/images';
import './style.css';

const canvas = document.getElementById('layout') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

let map: MapSectionInterface[][] = [];
let minesLeft: number;
let timer: number;
let canvasRect: DOMRect;

canvas.addEventListener('click', e => {
  const mousePos = {
    x: e.clientX - canvasRect.left,
    y: e.clientY - canvasRect.top,
  };

  if (isClickOnMap(mousePos)) {
    mapItemClicked(mousePos.x - borderSize, mousePos.y - headerSize);
  }
});

const isClickOnMap = (mousePos: { x: number; y: number }) =>
  mousePos.y > headerSize &&
  mousePos.y < canvas.height - borderSize &&
  mousePos.x > borderSize &&
  mousePos.x < canvas.width - borderSize;

const setSizeByDifficulty = (difficulty: number) => {
  const sizes = difficultySizes[difficulty];
  if (!sizes) {
    return;
  }

  canvas.width = sizes[0] * sectionSize + borderSize * 2;
  canvas.height = sizes[1] * sectionSize + headerSize + borderSize;
  canvasRect = canvas.getBoundingClientRect();
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

const printMineCounter = () => {
  const numbersToPrint = getNumberByDigits(checkNumberLimits(minesLeft));
  let x = borderSize;

  numbersToPrint.forEach(number => {
    ctx.drawImage(
      imageNumbers[number],
      x,
      borderSize,
      counterWidth,
      counterHeight,
    );
    x += counterWidth;
  });
};

const printTimerCounter = () => {
  const numbersToPrint = getNumberByDigits(checkNumberLimits(timer));
  let x = canvas.width - borderSize - counterWidth * 3;

  numbersToPrint.forEach(number => {
    ctx.drawImage(
      imageNumbers[number],
      x,
      borderSize,
      counterWidth,
      counterHeight,
    );
    x += counterWidth;
  });
};

const mapItemClicked = (x: number, y: number) => {
  const mapPosX = Math.floor(x / sectionSize);
  const mapPosY = Math.floor(y / sectionSize);
  console.log(mapPosY, mapPosX); //TODO!! Add click logic here
};

const loadGame = (difficulty: number) => {
  setSizeByDifficulty(difficulty);
  minesLeft = minesByDifficulty[difficulty];
  timer = 0;
  map = createMap(difficulty);

  printMineCounter();
  printTimerCounter();
  printMap();
};

const displayHideButton = () => {
  console.log('Button clicked!!');
};

loadGame(0);

export { displayHideButton };
