import React, { type JSX } from 'react';

import styles from './WinnersTable.module.css';
import { getSortIcon } from './helper';
import { WinnerRow } from './WinnerRow';
import type { WinnersTableProps } from './winners_table_types.ts';

const WinnersTable: React.FC<WinnersTableProps> = ({
  winners,
  onSort,
  sortBy,
  sortOrder,
}: WinnersTableProps): JSX.Element => (
  <div className={styles.tableContainer}>
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th className={styles.th}>Car №</th>
          <th className={styles.th}>Car</th>
          <th className={styles.th}>Name</th>
          <th className={`${styles.th} ${styles.sortable}`} onClick={() => onSort('wins')}>
            <div className={styles.headerContent}>
              Wins
              <span className={styles.sortIcon}>{getSortIcon(sortBy, sortOrder, 'wins')}</span>
            </div>
          </th>
          <th className={`${styles.th} ${styles.sortable}`} onClick={() => onSort('time')}>
            <div className={styles.headerContent}>
              Best Time
              <span className={styles.sortIcon}>{getSortIcon(sortBy, sortOrder, 'time')}</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {winners.map((winner) => (
          <WinnerRow key={winner.id} winner={winner} />
        ))}
      </tbody>
    </table>
  </div>
);

export default WinnersTable;
