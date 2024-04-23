import literals from '@literals';

const getRandomNumber = (min: number, max: number): number => {
  if (min > max) {
    console.error(literals.error_messages.min_value_greater_than_max);
    return NaN;
  }

  return Math.round(Math.random() * (max - min) + min);
};

export default getRandomNumber;
