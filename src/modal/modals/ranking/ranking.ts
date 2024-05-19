import divElement from '@modal/elements/div';
import h2Element from '@modal/elements/h2';
import selectElement from '@modal/elements/select';
import tableElement from '@modal/elements/table';
import buttonElement from '@/modal/elements/button';
import literals from '@literals';
import { getRanking } from '@/ranking';
import { closeModal } from '@/modal';
import './style.css';

const createTableObject = (ranking: RankingItem[]) => {
  return {
    head: [literals.name, literals.time],
    body: ranking.map(item => [item.name, item.time.toString()]),
  };
};

const TABLE_ID = 'ranking_table';

const RankingModal = () => {
  const ranking = getRanking();
  const container = divElement('ranking-container');

  const title = h2Element(literals.ranking);
  container.appendChild(title);

  const select = selectElement(
    [literals.easy, literals.normal, literals.hard],
    value => {
      const tableObject = createTableObject(ranking[value as 0 | 1 | 2]);
      const tableContainer = document.getElementById(TABLE_ID);

      if (tableContainer) {
        tableContainer.innerHTML = '';
        tableContainer.appendChild(tableElement(tableObject));
      }
    },
  );
  container.appendChild(select);

  const tableContainer = divElement('table-container', TABLE_ID);

  const tableObject = createTableObject(ranking[0]);
  const table = tableElement(tableObject);

  tableContainer.appendChild(table);
  container.appendChild(tableContainer);

  const close = buttonElement(literals.close, 'ranking-btn-close', closeModal);
  container.appendChild(close);

  return container;
};

export default RankingModal;
