import React, { useEffect, useState } from 'react';
import './App.css';
import { getNumbers, getPartItems } from './utils';
import { Pagination } from './components/Pagination';
import { DropDown } from './components/DropDown/DropDown';
import { ElementsOnPage } from './components/ElementsOnPage/ElementsOnPage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [elements, setElements] = useState<string[]>([]);

  const startRange = elements[0] ? elements[0].split(' ')[1] : 1;
  const endRange = elements[elements.length - 1]
    ? elements[elements.length - 1].split(' ')[1]
    : 5;

  useEffect(() => {
    const updatedElements = getPartItems(items, page, perPage);

    setElements(updatedElements);
  }, [perPage, setElements, page]);

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        {`Page ${page} (items ${startRange} - ${endRange} of ${items.length})`}
      </p>

      <DropDown value={perPage} setValue={setPerPage} setPage={setPage} />
      <Pagination
        total={items}
        perPage={perPage}
        currentPage={page}
        onPageChange={setPage}
      />
      <ElementsOnPage elements={elements} />
    </div>
  );
};

export default App;
