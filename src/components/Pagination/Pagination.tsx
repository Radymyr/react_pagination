import React, { useMemo } from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils';

type Props = {
  total: string[];
  perPage: number;
  currentPage: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const pages = Math.ceil(total.length / Number(perPage));

  const visibleButtons = useMemo(() => {
    const handlePageClick = (pageNumber: number) => {
      onPageChange(pageNumber);
    };

    const buttons: JSX.Element[] = getNumbers(1, pages).map(item => {
      return (
        <li
          key={item}
          className={classNames('page-item', {
            active: currentPage === item,
          })}
        >
          <a
            onClick={() => handlePageClick(item)}
            data-cy="pageLink"
            className="page-link"
            href={`#${item}`}
          >
            {item}
          </a>
        </li>
      );
    });

    return buttons;
  }, [onPageChange, pages, currentPage]);

  const handleDecrement = () => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleIncrement = () => {
    if (currentPage !== pages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', { disabled: currentPage === 1 })}
        >
          <a
            onClick={handleDecrement}
            data-cy="prevLink"
            className="page-link"
            href="#prev"
            aria-disabled={currentPage === 1 ? 'true' : 'false'}
          >
            «
          </a>
        </li>
        {visibleButtons}
        <li
          className={classNames('page-item', {
            disabled: currentPage === pages,
          })}
        >
          <a
            onClick={handleIncrement}
            data-cy="nextLink"
            className="page-link"
            href="#next"
            aria-disabled={currentPage === pages ? 'true' : 'false'}
          >
            »
          </a>
        </li>
      </ul>
    </>
  );
};
