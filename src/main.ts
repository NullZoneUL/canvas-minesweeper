import { difficultySizes } from './utils/difficulty';
import './style.css';

const canvas = document.getElementById('layout') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const setSizeByDifficulty = (level: number) => {
  const sizes = difficultySizes[level];
  if (!sizes) {
    return;
  }
  canvas.width = sizes[0];
  canvas.height = sizes[1];
  ctx.fillStyle = '#bdbdbd';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const displayHideButton = () => {
  console.log('Button clicked!!');
};

setSizeByDifficulty(0);

export { displayHideButton };
