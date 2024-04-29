const buttonElement = (
  text: string,
  className: string,
  onClick: () => void,
) => {
  const button = document.createElement('button');
  button.innerText = text;
  button.className = className;
  button.addEventListener('click', onClick);
  return button;
};

export default buttonElement;
