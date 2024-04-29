const divElement = (className: string) => {
  const div = document.createElement('div');
  div.className = className;
  return div;
};

export default divElement;
