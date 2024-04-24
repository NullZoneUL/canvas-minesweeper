import createMap from '@utils/createMap';
import checkNumberLimits from '@utils/checkNumberLimits';
import getNumberByDigits from '@utils/getNumberByDigits';
import getMapPosition from '@utils/getMapPosition';
import getMapClickPosition from '@utils/getMapClickPosition';
import getBoundaries from '@utils/getBoundaries';
import {
  getMapSizeByDifficulty,
  getNumberOfMinesByDifficulty,
} from '@utils/difficulty';
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
  mineImage,
  noMineImage,
} from './images';
import { SectionStates, GameStates } from './states';

const canvas = document.getElementById('layout') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

let map: MapSectionInterface[][] = [];
let emptyBoundaries: { x: number; y: number }[] = [];
let minesLeft: number;
let sectionsLeft: number;
let timer: number;
let canvasRect: DOMRect;
let timerInterval: number;
let gameStatus: 0 | 1 | 2;
let difficulty: number;

/****  Click event listeners  ****/

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

/********************************/

/****  Click functions  ****/

const mapItemClicked = (x: number, y: number) => {
  if (gameStatus === GameStates.ENDED) {
    return;
  }
  gameStatus === GameStates.LOADED && startGame();
  const mapPosX = getMapPosition(x);
  const mapPosY = getMapPosition(y);
  const item = map[mapPosY][mapPosX];

  //If the item is marked or already clicked, nothing else is executed
  if (item.state === SectionStates.FLAG) {
    return;
  }

  if (item.clicked) {
    item.nearbyMines > 0 && showNonEmptyBoundaries(mapPosX, mapPosY);
    checkWin();
    return;
  }

  if (item.mine) {
    item.clicked = true;
    return lostGame();
  }

  displayItem(mapPosX, mapPosY);
  checkWin();
};

const mapItemClickedRight = (x: number, y: number) => {
  if (gameStatus === GameStates.ENDED) {
    return;
  }
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

  item.state === SectionStates.FLAG
    ? minesLeft--
    : item.state === SectionStates.POSSIBLE && minesLeft++;
  updateMapItem(mapPosX, mapPosY);
  printMineCounter();
};

/***************************/

/****  Print functions  ****/

const setSizeByDifficulty = () => {
  const mapSize = getMapSizeByDifficulty(difficulty);
  minesLeft = getNumberOfMinesByDifficulty(difficulty);
  sectionsLeft = mapSize[0] * mapSize[1] - minesLeft;

  if (!mapSize) {
    //TODO!! Add error message
    return;
  }

  canvas.width = mapSize[0] * sectionSize + borderSize * 2;
  canvas.height = mapSize[1] * sectionSize + headerSize + borderSize;
  canvasRect = canvas.getBoundingClientRect();
  ctx.fillStyle = '#bdbdbd';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const printMap = (displayMines = false) => {
  let x = borderSize;
  let y = headerSize;
  let positionX = 0;
  let positionY = 0;
  map.forEach(row => {
    row.forEach(() => {
      if (!displayMines) {
        ctx.drawImage(uncheckedSectionImage, x, y, sectionSize, sectionSize);
      } else {
        updateMapItem(positionX, positionY, true);
      }
      x += sectionSize;
      positionX++;
    });
    y += sectionSize;
    x = borderSize;
    positionY++;
    positionX = 0;
  });
};

const updateMapItem = (x: number, y: number, displayMines = false) => {
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

  if (displayMines) {
    if (item.mine && !item.clicked && item.state !== SectionStates.FLAG) {
      imageToPrint = mineImage;
    } else if (!item.mine && item.state === SectionStates.FLAG) {
      imageToPrint = noMineImage;
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

/***************************/

/****  Map behavior functions  ****/

const showNonEmptyBoundaries = (x: number, y: number) => {
  const nearbyItems: { x: number; y: number }[] = [];
  const mapSize = getMapSizeByDifficulty(difficulty);
  let mines = 0;
  let flags = 0;
  getBoundaries(x, y, mapSize, (x_: number, y_: number) => {
    const newItem = map[y_][x_];
    if (newItem.state === SectionStates.FLAG) {
      newItem.mine && mines++;
      !newItem.mine && mines--;
      flags++;
    }
    nearbyItems.push({ x: x_, y: y_ });
  });

  if (map[y][x].nearbyMines === mines) {
    nearbyItems.forEach(position => {
      displayItem(position.x, position.y);
    });
    return;
  }

  flags === map[y][x].nearbyMines && lostGame();
};

const checkNeedToShowBoundaries = (x: number, y: number) => {
  const item = map[y][x];
  if (item.nearbyMines > 0) {
    return;
  }

  const mapSize = getMapSizeByDifficulty(difficulty);
  //If selected item hasn't been used for displaying new boundaries...
  if (!emptyBoundaries.find(e => e.x === x && e.y === y)) {
    emptyBoundaries.push({ x, y });
    return getBoundaries(x, y, mapSize, displayItem);
  }
};

const displayItem = (x: number, y: number) => {
  const item = map[y][x];
  if (item.state !== SectionStates.FLAG) {
    !item.clicked && !item.mine && sectionsLeft--;
    item.clicked = !item.mine;
    updateMapItem(x, y);
  }
  checkNeedToShowBoundaries(x, y);
};

/**********************************/

/****  Game state functions  ****/

const lostGame = () => {
  console.log('You lose!!!');
  printMap(true);
  onGameEnded();
};

const checkWin = () => {
  sectionsLeft === 0 && win();
};

const win = () => {
  alert('You win!!');
  onGameEnded();
};

const onGameEnded = () => {
  gameStatus = GameStates.ENDED;
  clearInterval(timerInterval);
};

const startGame = () => {
  gameStatus = GameStates.STARTED;
  timerInterval = setInterval(() => {
    timer++;
    printTimerCounter();
  }, 1000);
};

const loadGame = (gameDifficulty: number) => {
  difficulty = gameDifficulty;
  clearInterval(timerInterval);
  setSizeByDifficulty();
  timer = 0;
  map = createMap(difficulty);
  gameStatus = GameStates.LOADED;
  emptyBoundaries = [];

  printMineCounter();
  printTimerCounter();
  printMap();
};

/********************************/

window.addEventListener('load', () => {
  loadGame(0);
});

export { loadGame };
