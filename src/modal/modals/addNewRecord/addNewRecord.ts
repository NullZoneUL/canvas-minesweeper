import divElement from '@modal/elements/div';
import h2Element from '@modal/elements/h2';
import inputStringElement from '@modal/elements/inputString';
import buttonElement from '@modal/elements/button';
import literals from '@literals';
import { closeModal } from '@/modal';
import './style.css';

const NewRecordModal = (callback: (name: string) => void) => {
  const container = divElement('new-record-container');

  const title = h2Element(literals.new_record);
  container.appendChild(title);

  const inputName = inputStringElement('input-new-record', literals.name);
  container.appendChild(inputName);

  const buttonsContainer = divElement('new-record-buttons-container');
  const saveButton = buttonElement(literals.save, 'button-new-record', () => {
    if (inputName.value === '') {
      inputName.classList.add('input-error');
      return;
    }

    callback(inputName.value);
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

export default NewRecordModal;
