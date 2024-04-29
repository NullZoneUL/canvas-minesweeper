import literals from '@literals';
import '@assets/css/modal.css';

const modalContainer = document.getElementById('modal-container');

export const openNewModal = (modal: HTMLElement) => {
  if (!modalContainer) {
    return console.error(literals.error_messages.no_modal_container);
  }
  modalContainer.appendChild(modal);
  modalContainer.classList.add('modal-open');
};

export const closeModal = () => {
  if (!modalContainer) {
    return console.error(literals.error_messages.no_modal_container);
  }
  modalContainer.innerHTML = '';
  modalContainer.classList.remove('modal-open');
};
