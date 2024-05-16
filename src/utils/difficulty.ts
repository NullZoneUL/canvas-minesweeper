import literals from '@literals';

const difficultySizes = [
  [8, 8],
  [16, 16],
  [32, 16],
];

const minesByDifficulty = [10, 40, 99];

export const validRegularDifficulty = (difficulty: number) => {
  if (difficulty < 0 || difficulty > 2) {
    return false;
  }

  return true;
};

export const getMapSizeByDifficulty = (difficulty: number) => {
  if (difficulty < 0) {
    console.error(literals.error_messages.difficulty_less_than_0);
    difficulty = 0;
  }

  if (difficulty >= difficultySizes.length) {
    console.error(literals.error_messages.difficulty_nonexistent);
    difficulty = difficultySizes.length - 1;
  }

  return difficultySizes[difficulty];
};

export const getNumberOfMinesByDifficulty = (difficulty: number) => {
  if (difficulty < 0) {
    console.error(literals.error_messages.difficulty_less_than_0);
    difficulty = 0;
  }

  if (difficulty >= minesByDifficulty.length) {
    console.error(literals.error_messages.difficulty_nonexistent);
    difficulty = minesByDifficulty.length - 1;
  }

  return minesByDifficulty[difficulty];
};

export const addCustomGame = (xSize: number, ySize: number, mines: number) => {
  difficultySizes[3] = [xSize, ySize];
  minesByDifficulty[3] = mines;
};
