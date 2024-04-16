declare interface MapSectionInterface {
  mine: boolean; //true -> there is a mine in this section
  state: 0 | 1 | 2; // 0 -> unexposed; 1 -> marked; 2 -> exploded
  clicked: boolean;
  nearbyMines: number;
}
