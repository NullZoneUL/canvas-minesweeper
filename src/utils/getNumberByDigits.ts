const getNumberByDigits = (number: number) => {
  const numberSplitted = number.toString().split('');
  while (numberSplitted.length < 3) {
    //In case the number is negative...
    if (numberSplitted.indexOf('-') > -1) {
      //A 0 is added between the minus symbol and the number
      numberSplitted.splice(1, 0, '0');
      break;
    }
    numberSplitted.unshift('0');
  }

  //Number 10 is the position for the minus symbol in the counter images array
  return numberSplitted.map(num => (num != '-' ? parseInt(num) : 10));
};

export default getNumberByDigits;
