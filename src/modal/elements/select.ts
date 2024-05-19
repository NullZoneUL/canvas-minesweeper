const selectElement = (
  values: string[],
  onChange?: (value: number) => void,
) => {
  const select = document.createElement('select');

  values.forEach((item, index) => {
    const option = document.createElement('option');
    option.value = index.toString();
    option.text = item;
    select.appendChild(option);
  });

  onChange &&
    select.addEventListener('change', () => {
      onChange(parseInt(select.value));
    });

  return select;
};

export default selectElement;
