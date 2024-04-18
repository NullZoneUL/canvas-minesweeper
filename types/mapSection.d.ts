declare interface MapSectionInterface {
  mine: boolean; //true -> there is a mine in this section
  state: 0 | 1 | 2; // 0 -> normal; 1 -> flag; 2 -> question mark;
  clicked: boolean;
  nearbyMines: number;
}
