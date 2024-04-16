const getNumberByDigits = (number: number) => {
  const numberSplitted = number.toString().split('');
  while (numberSplitted.length < 3) {
    numberSplitted.unshift('0');
  }
  return numberSplitted.map(num => parseInt(num));
};

export default getNumberByDigits;
