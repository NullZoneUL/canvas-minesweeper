declare interface RankingItem {
  name: string;
  time: number;
}

declare interface RankingInterface {
  '0': RankingItem[];
  '1': RankingItem[];
  '2': RankingItem[];
}
