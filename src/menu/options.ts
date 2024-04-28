import literals from '@literals';
import { openCloseMenu } from './menu';
import { difficulty, loadGame } from '@/main';

const loadNewGame = () => {
  loadGame(difficulty);
};

const menuOnClick = (callback?: () => void) => {
  openCloseMenu();
  callback && callback();
};

export const menuOptions: MenuOptionsInterface[] = [
  {
    title: literals.new_game,
    action: () => menuOnClick(loadNewGame),
  },
  /*{
    title: literals.pause,
    action: () => console.log('TODO!!'),
  },
  {
    title: literals.easy,
    action: () => console.log('TODO!!'),
  },
  {
    title: literals.normal,
    action: () => console.log('TODO!!'),
  },
  {
    title: literals.hard,
    action: () => console.log('TODO!!'),
  },
  {
    title: literals.custom,
    action: () => console.log('TODO!!'),
  },
  {
    title: literals.ranking,
    action: () => console.log('TODO!!'),
  },*/
  {
    title: literals.close,
    action: () => menuOnClick(),
  },
];
