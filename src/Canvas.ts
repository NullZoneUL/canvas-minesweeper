import { difficulty } from './utils/difficulty';

class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  constructor(width: number, height: number) {
    this.canvas = document.getElementById('layout') as HTMLCanvasElement;

    this.canvas.width = width;
    this.canvas.height = height;

    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.fillStyle = '#bdbdbd';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  updateSize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
  }
}

const canvas = new Canvas(difficulty[0][0], difficulty[0][1]);

export default canvas;
