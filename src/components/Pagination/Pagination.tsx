import React, { type JSX } from 'react';

import styles from './Pagination.module.css';
import { createPageRange } from './paginationHelpers';
import type { PaginationProps } from './pagination_types';

const PageButton = ({
  page,
  onPageChange,
  currentPage,
}: {
  page: number;
  onPageChange: (page: number) => void;
  currentPage: number;
}): JSX.Element => (
  <button
    onClick={() => onPageChange(page)}
    className={`${styles.button} ${currentPage === page ? styles.active : ''}`}
  >
    {page}
  </button>
);

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}): JSX.Element | null => {
  if (totalPages <= 1) return null;

  const visiblePages = createPageRange(currentPage, totalPages);

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${styles.button} ${styles.nav}`}
      >
        Previous
      </button>

      {visiblePages.map((p, i) =>
        p === '...' ? (
          <span key={i} className={styles.dots}>
            ...
          </span>
        ) : (
          <PageButton key={i} page={p} onPageChange={onPageChange} currentPage={currentPage} />
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${styles.button} ${styles.nav}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
