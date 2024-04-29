const h2Element = (text: string) => {
  const h2 = document.createElement('h2');
  h2.innerText = text;
  return h2;
};

export default h2Element;
