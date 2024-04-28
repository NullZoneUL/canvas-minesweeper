import literals from '@literals';
import { difficulty, loadGame } from '@/main';
import { openCloseMenu } from './menu';

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
  },*/
  {
    title: literals.easy,
    action: () => menuOnClick(() => loadGame(0)),
  },
  {
    title: literals.normal,
    action: () => menuOnClick(() => loadGame(1)),
  },
  {
    title: literals.hard,
    action: () => menuOnClick(() => loadGame(2)),
  },
  /*{
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
