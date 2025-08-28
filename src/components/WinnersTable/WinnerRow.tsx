import React, { type JSX } from 'react';

import CarSvg from '../../assets/svg/CarSvg';

import styles from './WinnersTable.module.css';
import { formatTime } from './helper';
import type { WinnerRowProps } from './winners_table_types.ts';

export const WinnerRow: React.FC<WinnerRowProps> = ({ winner }): JSX.Element => (
  <tr className={styles.tr}>
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
);
