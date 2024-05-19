interface TableElementFormat {
  body: string[][];
  head?: string[];
}

const tableElement = (elements: TableElementFormat) => {
  const table = document.createElement('table');

  if (elements.head) {
    const header = document.createElement('thead');
    const tr = document.createElement('tr');

    elements.head.forEach(item => {
      const th = document.createElement('th');
      th.textContent = item;
      tr.appendChild(th);
    });

    header.appendChild(tr);
    table.appendChild(header);
  }

  const body = document.createElement('tbody');
  elements.body.forEach(row => {
    const tr = document.createElement('tr');

    row.forEach(item => {
      const td = document.createElement('td');
      td.textContent = item;
      tr.appendChild(td);
    });

    body.appendChild(tr);
  });
  table.appendChild(body);

  return table;
};

export default tableElement;
