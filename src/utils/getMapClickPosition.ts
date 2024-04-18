import { borderSize, headerSize } from '../sizes';

const getMapClickPosition = (mousePos: { x: number; y: number }) => {
  return {
    x: mousePos.x - borderSize,
    y: mousePos.y - headerSize,
  };
};

export default getMapClickPosition;
