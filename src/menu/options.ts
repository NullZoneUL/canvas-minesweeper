import CustomGameModal from '@/modal/modals/customGame/customGame';
import literals from '@literals';
import { difficulty, loadGame, pauseResumeGame } from '@/main';
import { openNewModal } from '@/modal';
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
  {
    title: literals.pause,
    action: () => menuOnClick(pauseResumeGame),
  },
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
  {
    title: literals.custom,
    action: () => menuOnClick(() => openNewModal(CustomGameModal())),
  },
  /*{
    title: literals.ranking,
    action: () => console.log('TODO!!'),
  },*/
  {
    title: literals.close,
    action: () => menuOnClick(),
  },
];
