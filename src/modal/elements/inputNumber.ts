const inputNumberElement = (
  className: string,
  placeholder: string,
  id?: string,
) => {
  const input = document.createElement('input');
  input.type = 'number';
  input.className = className;
  input.placeholder = placeholder;

  if (id) {
    input.id = id;
  }

  return input;
};

export default inputNumberElement;
