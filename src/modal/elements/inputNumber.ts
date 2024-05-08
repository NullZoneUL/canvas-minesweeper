const inputNumberElement = (
  className: string,
  placeholder: string,
  minValue?: number,
  id?: string,
) => {
  const input = document.createElement('input');
  input.type = 'number';
  input.className = className;
  input.placeholder = placeholder;

  if (id) {
    input.id = id;
  }

  if (minValue !== null && minValue !== undefined) {
    input.min = minValue.toString();
  }

  return input;
};

export default inputNumberElement;
