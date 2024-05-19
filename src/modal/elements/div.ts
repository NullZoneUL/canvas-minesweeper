const divElement = (className: string, id?: string) => {
  const div = document.createElement('div');
  div.className = className;

  if (id) {
    div.id = id;
  }

  return div;
};

export default divElement;
