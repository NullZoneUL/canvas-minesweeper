const checkNumberLimits = (number: number) =>
  number <= 999 ? (number >= -999 ? number : -999) : 999;
export default checkNumberLimits;
