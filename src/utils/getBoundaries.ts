const getBoundaries = (
  x: number,
  y: number,
  mapSize: number[],
  callback: (x: number, y: number) => void,
) => {
  for (let y_ = y - 1; y_ < mapSize[1] && y_ <= y + 1; y_++) {
    if (y_ > -1) {
      for (let x_ = x - 1; x_ < mapSize[0] && x_ <= x + 1; x_++) {
        x_ > -1 && callback(x_, y_);
      }
    }
  }
};

export default getBoundaries;
