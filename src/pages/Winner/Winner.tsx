import type React from 'react';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchWinners, setCurrentPage, setSorting } from '../../redux/slices/winnersSlice';
import { API_CONFIG } from '../../api/constants';
import WinnersTable from '../../components/WinnersTable/WinnersTable';
import Pagination from '../../components/Pagination/Pagination';

import styles from './Winner.module.css';

const Winner: React.FC = () => {
  const dispatch = useAppDispatch();
  const { winners, totalCount, currentPage, sortBy, sortOrder, loading, error } = useAppSelector(
    (state) => state.winners
  );

  useEffect(() => {
    dispatch(
      fetchWinners({
        page: currentPage,
        limit: API_CONFIG.PAGINATION.WINNERS_PAGE_SIZE,
        sort: sortBy,
        order: sortOrder,
      })
    );
  }, [dispatch, currentPage, sortBy, sortOrder]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleSort = (column: 'id' | 'wins' | 'time') => {
    const newOrder = sortBy === column && sortOrder === 'ASC' ? 'DESC' : 'ASC';
    dispatch(setSorting({ sortBy: column, sortOrder: newOrder }));
  };

  const totalPages = Math.ceil(totalCount / API_CONFIG.PAGINATION.WINNERS_PAGE_SIZE);

  return (
    <div className={styles.winner}>
      <div className={styles.header}>
        <h2 className={styles.title}>Winners</h2>
        <div className={styles.winnersCount}>
          Total winners: <span className={styles.count}>{totalCount}</span>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.content}>
        {loading && winners.length === 0 ? (
          <div className={styles.loading}>Loading winners...</div>
        ) : winners.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🏆</div>
            <h3>No Winners Yet</h3>
            <p>Complete some races in the garage to see winners here!</p>
          </div>
        ) : (
          <>
            <WinnersTable
              winners={winners}
              onSort={handleSort}
              sortBy={sortBy}
              sortOrder={sortOrder}
            />

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Winner;
