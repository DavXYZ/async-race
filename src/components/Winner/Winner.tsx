import type React from 'react';

import WinnersTable from '../../components/WinnersTable/WinnersTable';
import Pagination from '../../components/Pagination/Pagination';
import type { WinnerWithCar } from '../../types';

import styles from './Winner.module.css';

type WinnerUIProps = {
  winners: WinnerWithCar[];
  totalCount: number;
  currentPage: number;
  sortBy: 'id' | 'wins' | 'time';
  sortOrder: 'ASC' | 'DESC';
  loading: boolean;
  error: string | null;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSort: (column: 'id' | 'wins' | 'time') => void;
};

const WinnerHeader: React.FC<{ totalCount: number }> = ({ totalCount }) => (
  <div className={styles.header}>
    <h2 className={styles.title}>Winners</h2>
    <div className={styles.winnersCount}>
      Total winners: <span className={styles.count}>{totalCount}</span>
    </div>
  </div>
);

const WinnerEmpty: React.FC = () => (
  <div className={styles.empty}>
    <div className={styles.emptyIcon}>🏆</div>
    <h3>No Winners Yet</h3>
    <p>Complete some races in the garage to see winners here!</p>
  </div>
);

const WinnerContent: React.FC<{
  winners: WinnerWithCar[];
  sortBy: 'id' | 'wins' | 'time';
  sortOrder: 'ASC' | 'DESC';
  totalPages: number;
  currentPage: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  onSort: (column: 'id' | 'wins' | 'time') => void;
}> = ({ winners, sortBy, sortOrder, totalPages, currentPage, loading, onPageChange, onSort }) => {
  if (loading && winners.length === 0)
    return <div className={styles.loading}>Loading winners...</div>;
  if (winners.length === 0) return <WinnerEmpty />;

  return (
    <>
      <WinnersTable winners={winners} onSort={onSort} sortBy={sortBy} sortOrder={sortOrder} />
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      )}
    </>
  );
};

const Winner: React.FC<WinnerUIProps> = (props) => {
  return (
    <div className={styles.winner}>
      <WinnerHeader totalCount={props.totalCount} />
      {props.error && <div className={styles.error}>{props.error}</div>}
      <div className={styles.content}>
        <WinnerContent {...props} />
      </div>
    </div>
  );
};

export default Winner;
