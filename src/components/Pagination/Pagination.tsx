import React, { useMemo } from 'react';
import classNames from 'classnames';

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

    const buttons = [];

    for (let i = 1; i <= pages; i += 1) {
      buttons.push(
        <li
          key={i}
          className={classNames('page-item', { active: currentPage === i })}
        >
          <a
            onClick={() => handlePageClick(i)}
            data-cy="pageLink"
            className="page-link"
            href={`#${i}`}
          >
            {i}
          </a>
        </li>,
      );
    }

    return buttons;
  }, [onPageChange, pages, currentPage]);

  return (
    <>
      <ul className="pagination">
        <li
          className={classNames('page-item', { disabled: currentPage === 1 })}
        >
          <a
            onClick={() => {
              if (currentPage !== 1) {
                onPageChange(currentPage - 1);
              }
            }}
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
            onClick={() => {
              if (currentPage !== pages) {
                onPageChange(currentPage + 1);
              }
            }}
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
