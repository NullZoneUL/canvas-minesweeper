import createMap from './utils/createMap';
import checkNumberLimits from './utils/checkNumberLimits';
import getNumberByDigits from './utils/getNumberByDigits';
import getMapPosition from './utils/getMapPosition';
import getMapClickPosition from './utils/getMapClickPosition';
import {
  sectionSize,
  borderSize,
  headerSize,
  counterHeight,
  counterWidth,
} from './sizes';
import {
  uncheckedSectionImage,
  counterImageNumbers,
  mapImageNumbers,
  detonatedMineImage,
  flagImage,
  questionMarkImage,
} from './images';
import { SectionStates } from './sectionStates';
import { difficultySizes, minesByDifficulty } from './utils/difficulty';
import './style.css';

const canvas = document.getElementById('layout') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

let map: MapSectionInterface[][] = [];
let minesLeft: number;
let timer: number;
let canvasRect: DOMRect;
let timerInterval: number;
let gameStarted = false;

canvas.addEventListener('click', e => {
  const mousePos = {
    x: e.clientX - canvasRect.left,
    y: e.clientY - canvasRect.top,
  };

  if (isClickOnMap(mousePos)) {
    const mapMousePositions = getMapClickPosition(mousePos);
    mapItemClicked(mapMousePositions.x, mapMousePositions.y);
  }
});

canvas.addEventListener('contextmenu', e => {
  e.preventDefault();
  const mousePos = {
    x: e.clientX - canvasRect.left,
    y: e.clientY - canvasRect.top,
  };

  if (isClickOnMap(mousePos)) {
    const mapMousePositions = getMapClickPosition(mousePos);
    mapItemClickedRight(mapMousePositions.x, mapMousePositions.y);
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

const updateMapItem = (x: number, y: number) => {
  const item = map[y][x];
  const mapXPosition = borderSize + x * sectionSize;
  const mapYPosition = headerSize + y * sectionSize;
  let imageToPrint = uncheckedSectionImage;

  if (item.state !== SectionStates.NORMAL) {
    imageToPrint =
      item.state === SectionStates.FLAG ? flagImage : questionMarkImage;
  }

  if (item.clicked) {
    if (item.mine) {
      imageToPrint = detonatedMineImage;
    } else {
      imageToPrint = mapImageNumbers[item.nearbyMines];
    }
  }

  ctx.drawImage(
    imageToPrint,
    mapXPosition,
    mapYPosition,
    sectionSize,
    sectionSize,
  );
};

const printMineCounter = () => {
  const numbersToPrint = getNumberByDigits(checkNumberLimits(minesLeft));
  let x = borderSize;

  numbersToPrint.forEach(number => {
    ctx.drawImage(
      counterImageNumbers[number],
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
      counterImageNumbers[number],
      x,
      borderSize,
      counterWidth,
      counterHeight,
    );
    x += counterWidth;
  });
};

const mapItemClicked = (x: number, y: number) => {
  !gameStarted && startGame();
  const mapPosX = getMapPosition(x);
  const mapPosY = getMapPosition(y);
  const item = map[mapPosY][mapPosX];

  //If the item is marked or already clicked, nothing else is executed
  if (item.state === SectionStates.FLAG || item.clicked) {
    return;
  }

  item.clicked = true;
  item.mine && lostGame();

  updateMapItem(mapPosX, mapPosY);
};

const mapItemClickedRight = (x: number, y: number) => {
  const mapPosX = getMapPosition(x);
  const mapPosY = getMapPosition(y);
  const item = map[mapPosY][mapPosX];

  //If the item is already clicked, nothing else is executed
  if (item.clicked) {
    return;
  }

  item.state =
    item.state === SectionStates.POSSIBLE
      ? SectionStates.NORMAL
      : ((item.state + 1) as 0 | 1 | 2);
  updateMapItem(mapPosX, mapPosY);
};

const lostGame = () => {
  //TODO!! Add behavior here
  console.log('You lose!!!');
  gameStarted = false;
  clearInterval(timerInterval);
};

const startGame = () => {
  gameStarted = true;
  timerInterval = setInterval(() => {
    timer++;
    printTimerCounter();
  }, 1000);
};

const loadGame = (difficulty: number) => {
  clearInterval(timerInterval);
  setSizeByDifficulty(difficulty);
  minesLeft = minesByDifficulty[difficulty];
  timer = 0;
  map = createMap(difficulty);
  gameStarted = false;

  printMineCounter();
  printTimerCounter();
  printMap();
};

const displayHideButton = () => {
  console.log('Button clicked!!');
};

loadGame(0);

export { displayHideButton };
