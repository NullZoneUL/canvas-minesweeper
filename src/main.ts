import debounce from 'lodash.debounce';
import createMap from '@utils/createMap';
import checkNumberLimits from '@utils/checkNumberLimits';
import getNumberByDigits from '@utils/getNumberByDigits';
import getMapPosition from '@utils/getMapPosition';
import getMapClickPosition from '@utils/getMapClickPosition';
import getBoundaries from '@utils/getBoundaries';
import literals from '@literals';
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
  resetButtonSize,
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
  resetButtonImages,
  simpleBorder,
  cornerBorders,
  cornerIntersections,
} from './images';
import { SectionStates, GameStates, ResetButtonStates } from './states';
import { checkRanking, newWinOpenModal } from './ranking';
import './menu/menu';

const SAVED_DIFFICULTY_ID = 'lastDifficulty';
const canvas = document.getElementById('layout') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

let map: MapSectionInterface[][] = [];
let emptyBoundaries: { x: number; y: number }[] = [];
let minesLeft: number;
let sectionsLeft: number;
let timer: number;
let canvasRect: DOMRect;
let timerInterval: number;
let gameStatus: 0 | 1 | 2 | 3;
let difficulty: number;
let resetButtonPosition: number[];

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

  if (isClickOnResetButton(mousePos)) {
    gameStatus === GameStates.PAUSED
      ? pauseResumeGame()
      : loadGame(difficulty || 0);
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

canvas.addEventListener('mousedown', e => {
  const mousePos = {
    x: e.clientX - canvasRect.left,
    y: e.clientY - canvasRect.top,
  };

  //If the mouse button used is not left or if the game status is ENDED or PAUSED, do nothing
  if (
    e.button !== 0 ||
    gameStatus === GameStates.ENDED ||
    gameStatus === GameStates.PAUSED
  ) {
    return;
  }

  isClickOnMap(mousePos) && printResetButton(ResetButtonStates.CLICK);
});

const isClickOnMap = (mousePos: { x: number; y: number }) =>
  mousePos.y > headerSize &&
  mousePos.y < canvas.height - borderSize &&
  mousePos.x > borderSize &&
  mousePos.x < canvas.width - borderSize;

const isClickOnResetButton = (mousePos: { x: number; y: number }) =>
  mousePos.y > resetButtonPosition[1] &&
  mousePos.y < resetButtonPosition[1] + resetButtonSize &&
  mousePos.x > resetButtonPosition[0] &&
  mousePos.x < resetButtonPosition[0] + resetButtonSize;

/********************************/

/****  Click functions  ****/

const mapItemClicked = (x: number, y: number) => {
  if (gameStatus === GameStates.ENDED || gameStatus === GameStates.PAUSED) {
    return;
  }

  const mapPosX = getMapPosition(x);
  const mapPosY = getMapPosition(y);

  if (gameStatus === GameStates.LOADED) {
    map = createMap(difficulty, mapPosX, mapPosY);
    startGame();
  }

  const item = map[mapPosY][mapPosX];

  //If the item is marked or already clicked, nothing else is executed
  if (item.state === SectionStates.FLAG) {
    return;
  }

  if (item.clicked) {
    printResetButton(ResetButtonStates.NORMAL);
    item.nearbyMines > 0 && showNonEmptyBoundaries(mapPosX, mapPosY);
    checkWin();
    return;
  }

  if (item.mine) {
    item.clicked = true;
    return lostGame();
  }

  printResetButton(ResetButtonStates.NORMAL);
  displayItem(mapPosX, mapPosY);
  checkWin();
};

const mapItemClickedRight = (x: number, y: number) => {
  if (gameStatus === GameStates.ENDED || gameStatus === GameStates.PAUSED) {
    return;
  }

  if (gameStatus === GameStates.LOADED) {
    map = createMap(difficulty, -1, -1);
    startGame();
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

const printFirstMapState = () => {
  const mapSize = getMapSizeByDifficulty(difficulty);
  let x_ = borderSize;
  let y_ = headerSize;
  for (let i = 0; i < mapSize[1]; i++) {
    for (let x = 0; x < mapSize[0]; x++) {
      ctx.drawImage(uncheckedSectionImage, x_, y_, sectionSize, sectionSize);
      x_ += sectionSize;
    }
    y_ += sectionSize;
    x_ = borderSize;
  }
};

const printFullMap = () => {
  let x = borderSize;
  let y = headerSize;
  let positionX = 0;
  let positionY = 0;
  map.forEach(row => {
    row.forEach(() => {
      updateMapItem(positionX, positionY, true);
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

const printResetButton = (mode: number) => {
  let imageToPrint = resetButtonImages[mode];

  if (!imageToPrint) {
    console.error(literals.error_messages.undefined_face_image);
    imageToPrint = resetButtonImages[ResetButtonStates.NORMAL];
  }

  ctx.drawImage(
    imageToPrint,
    resetButtonPosition[0],
    resetButtonPosition[1],
    resetButtonSize,
    resetButtonSize,
  );
};

const setResetButtonPosition = () => {
  resetButtonPosition = [canvas.width / 2 - resetButtonSize / 2, borderSize];
};

const printBorders = () => {
  const mapSize = getMapSizeByDifficulty(difficulty);
  const mapWidth = sectionSize * mapSize[0];
  const mapHeight = sectionSize * mapSize[1];
  const underHeader = headerSize - borderSize;
  const bottom = headerSize + mapHeight;
  const right = mapWidth + borderSize;

  ctx.drawImage(simpleBorder, borderSize, 0, mapWidth, borderSize);
  ctx.drawImage(simpleBorder, borderSize, underHeader, mapWidth, borderSize);
  ctx.drawImage(simpleBorder, borderSize, bottom, mapWidth, borderSize);
  printRotatedImage(
    simpleBorder,
    0,
    bottom + borderSize,
    -90,
    mapHeight + underHeader,
    borderSize,
    borderSize,
    0,
  );
  printRotatedImage(
    simpleBorder,
    right,
    bottom + borderSize,
    -90,
    mapHeight + underHeader,
    borderSize,
    borderSize,
    0,
  );

  ctx.drawImage(cornerBorders[0], right, 0, borderSize, borderSize);
  ctx.drawImage(cornerBorders[1], 0, 0, borderSize, borderSize);
  ctx.drawImage(cornerBorders[2], 0, bottom, borderSize, borderSize);
  ctx.drawImage(cornerBorders[3], right, bottom, borderSize, borderSize);

  ctx.drawImage(cornerIntersections[0], 0, underHeader, borderSize, borderSize);
  ctx.drawImage(
    cornerIntersections[1],
    right,
    underHeader,
    borderSize,
    borderSize,
  );
};

const printRotatedImage = (
  image: HTMLImageElement,
  x: number,
  y: number,
  angle: number,
  width: number,
  height: number,
  imageX: number,
  imageY: number,
) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.drawImage(image, imageX, imageY, width, height);
  ctx.restore();
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
  if (item.nearbyMines > 0 || item.mine) {
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

const pauseResumeGame = () => {
  if (gameStatus === GameStates.STARTED) {
    gameStatus = GameStates.PAUSED;
    clearInterval(timerInterval);
    printResetButton(ResetButtonStates.PAUSE);
  } else if (gameStatus === GameStates.PAUSED) {
    gameStatus = GameStates.STARTED;
    startGame();
    printResetButton(ResetButtonStates.NORMAL);
  }
};

const lostGame = () => {
  console.log('You lose!!!');
  printResetButton(ResetButtonStates.DEAD);
  printFullMap();
  onGameEnded();
};

const checkWin = () => {
  sectionsLeft === 0 && win();
};

const win = () => {
  console.log('You win!!');
  printResetButton(ResetButtonStates.WIN);
  onGameEnded();
  newWinOpenModal(timer, difficulty);
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
  setResetButtonPosition();
  timer = 0;
  gameStatus = GameStates.LOADED;
  emptyBoundaries = [];

  printBorders();
  printMineCounter();
  printTimerCounter();
  printResetButton(ResetButtonStates.NORMAL);
  printFirstMapState();

  if (gameDifficulty >= 0 && gameDifficulty <= 2) {
    localStorage.setItem(SAVED_DIFFICULTY_ID, gameDifficulty.toString());
  }
};

/********************************/

const resizeDebounce = debounce(
  () => (canvasRect = canvas.getBoundingClientRect()),
  300,
);
window.addEventListener('resize', resizeDebounce);

window.addEventListener('load', () => {
  const savedDifficulty = localStorage.getItem(SAVED_DIFFICULTY_ID);
  loadGame(!!savedDifficulty ? parseInt(savedDifficulty) : 1);
  checkRanking();
});

export { difficulty, loadGame, pauseResumeGame };
