const getRandomNumber = (min: number, max: number): number => {
  if (min > max) {
    console.error('Max value has to be bigger than min value');
    return NaN;
  }

  return Math.round(Math.random() * (max - min) + min);
};

export default getRandomNumber;
