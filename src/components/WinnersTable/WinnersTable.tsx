'use client';

import type React from 'react';

import type { WinnerWithCar } from '@/types';
import CarSvg from '../../assets/svg/CarSvg';

import styles from './WinnersTable.module.css';

interface WinnersTableProps {
  winners: WinnerWithCar[];
  onSort: (column: 'id' | 'wins' | 'time') => void;
  sortBy: 'id' | 'wins' | 'time';
  sortOrder: 'ASC' | 'DESC';
}

const WinnersTable: React.FC<WinnersTableProps> = ({ winners, onSort, sortBy, sortOrder }) => {
  const getSortIcon = (column: 'id' | 'wins' | 'time') => {
    if (sortBy !== column) return '↕️';
    return sortOrder === 'ASC' ? '↑' : '↓';
  };

  const formatTime = (time: number) => {
    return `${time.toFixed(2)}s`;
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={`${styles.th} ${styles.sortable}`} onClick={() => onSort('id')}>
              <div className={styles.headerContent}>
                Car №<span className={styles.sortIcon}>{getSortIcon('id')}</span>
              </div>
            </th>
            <th className={styles.th}>Car</th>
            <th className={styles.th}>Name</th>
            <th className={`${styles.th} ${styles.sortable}`} onClick={() => onSort('wins')}>
              <div className={styles.headerContent}>
                Wins
                <span className={styles.sortIcon}>{getSortIcon('wins')}</span>
              </div>
            </th>
            <th className={`${styles.th} ${styles.sortable}`} onClick={() => onSort('time')}>
              <div className={styles.headerContent}>
                Best Time
                <span className={styles.sortIcon}>{getSortIcon('time')}</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {winners.map((winner) => (
            <tr key={winner.id} className={styles.tr}>
              <td className={styles.td}>
                <div className={styles.carNumber}>#{winner.id}</div>
              </td>
              <td className={styles.td}>
                <div className={styles.carIcon}>
                  <CarSvg color={winner.car.color} />
                </div>
              </td>
              <td className={styles.td}>
                <div className={styles.carName}>{winner.car.name}</div>
              </td>
              <td className={styles.td}>
                <div className={styles.wins}>
                  <span className={styles.winsNumber}>{winner.wins}</span>
                  <span className={styles.winsLabel}>win{winner.wins !== 1 ? 's' : ''}</span>
                </div>
              </td>
              <td className={styles.td}>
                <div className={styles.time}>{formatTime(winner.time)}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WinnersTable;
