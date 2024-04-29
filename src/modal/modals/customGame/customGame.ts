import divElement from '@modal/elements/div';
import h2Element from '@modal/elements/h2';
import inputNumberElement from '@/modal/elements/inputNumber';
import buttonElement from '@modal/elements/button';
import literals from '@literals';
import { addCustomGame } from '@utils/difficulty';
import { loadGame } from '@/main';
import { closeModal } from '@/modal';
import './style.css';

const CustomGameModal = () => {
  const container = divElement('custom-game-container');

  const title = h2Element(literals.new_custom_game);
  container.appendChild(title);

  const inputsContainer = divElement('custom-game-inputs-container');
  const sizeX = inputNumberElement('input-custom-game', literals.size_x);
  const sizeY = inputNumberElement('input-custom-game', literals.size_y);
  const numberOfMines = inputNumberElement(
    'input-custom-game',
    literals.number_mines,
  );
  inputsContainer.appendChild(sizeX);
  inputsContainer.appendChild(sizeY);
  inputsContainer.appendChild(numberOfMines);
  container.appendChild(inputsContainer);

  const buttonsContainer = divElement('custom-game-buttons-container');
  const saveButton = buttonElement(literals.save, 'button-custom-game', () => {
    const mines = parseInt(numberOfMines.value);
    const x = parseInt(sizeX.value);
    const y = parseInt(sizeY.value);

    if (mines > x * y) {
      sizeX.classList.add('input-error');
      sizeY.classList.add('input-error');
      numberOfMines.classList.add('input-error');
      return;
    }

    addCustomGame(x, y, mines);
    loadGame(3);
    closeModal();
  });
  const cancelButton = buttonElement(
    literals.cancel,
    'button-custom-game',
    closeModal,
  );
  buttonsContainer.appendChild(saveButton);
  buttonsContainer.appendChild(cancelButton);
  container.appendChild(buttonsContainer);

  return container;
};

export default CustomGameModal;
