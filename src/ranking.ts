import NewRecordModal from '@modal/modals/addNewRecord/addNewRecord';
import { validRegularDifficulty } from '@utils/difficulty';
import { openNewModal } from '@modal/index';

const ID = 'SAVED_GAMES';
const MAX_ITEMS_BY_DIFFICULTY = 20;

const getRankingByDifficulty = (difficulty: number) => {
  if (!validRegularDifficulty(difficulty)) {
    return;
  }

  const rankings = getRanking();
  return rankings[difficulty as 0 | 1 | 2];
};

const checkIfNewRecord = (time: number, ranking: RankingItem[]) => {
  if (ranking.length < MAX_ITEMS_BY_DIFFICULTY) {
    return true;
  }

  if (ranking[ranking.length - 1].time > time) {
    return true;
  }

  return false;
};

const addNewRecord = (name: string, time: number, difficulty: number) => {
  const ranking = getRankingByDifficulty(difficulty);

  if (!ranking) {
    return;
  }

  for (let i = 0; i < ranking.length; i++) {
    if (ranking[i].time > time) {
      ranking.splice(i, 0, { name, time });
      break;
    }
  }

  if (ranking.length === 0) {
    ranking.push({ name, time });
  }

  ranking.length > MAX_ITEMS_BY_DIFFICULTY && ranking.pop();

  const allRankings = getRanking();
  allRankings[difficulty as 0 | 1 | 2] = ranking;

  setRanking(allRankings);
};

const setRanking = (ranking: RankingInterface) => {
  const stringify = JSON.stringify(ranking);
  localStorage.setItem(ID, stringify);
};

export const getRanking = (): RankingInterface => {
  const stringRanking = localStorage.getItem(ID) as string;
  return JSON.parse(stringRanking);
};

export const checkRanking = () => {
  if (localStorage.getItem(ID)) {
    return;
  }

  const newRanking: RankingInterface = {
    '0': [],
    '1': [],
    '2': [],
  };

  setRanking(newRanking);
};

export const newWinOpenModal = (time: number, difficulty: number) => {
  const ranking = getRankingByDifficulty(difficulty);

  if (!ranking || !checkIfNewRecord(time, ranking)) {
    return;
  }

  openNewModal(
    NewRecordModal((name: string) => addNewRecord(name, time, difficulty)),
  );
};
