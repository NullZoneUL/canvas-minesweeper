declare interface MapSectionInterface {
  mine: boolean; //true -> there is a mine in this section
  state: 0 | 1 | 2 | 3; // 0 -> unexposed; 1 -> flag; 2 -> question mark; 3 -> exploded
  clicked: boolean;
  nearbyMines: number;
}
