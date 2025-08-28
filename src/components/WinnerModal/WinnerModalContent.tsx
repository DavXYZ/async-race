import type React from 'react';
import type { JSX } from 'react';

import CarSvg from '../../assets/svg/CarSvg';

import styles from './WinnerModal.module.css';
import type { WinnerModalContentProps } from './winner_modal_types';

export const WinnerModalContent: React.FC<WinnerModalContentProps> = ({ winner }): JSX.Element => (
  <div className={styles.content}>
    <div className={styles.winnerCar}>
      <CarSvg color={winner.color} />
    </div>
    <h3 className={styles.winnerName}>{winner.name}</h3>
    <p className={styles.winnerMessage}>Congratulations! {winner.name} won the race!</p>
    <div className={styles.celebration}>
      <div className={styles.firework}></div>
      <div className={styles.firework}></div>
      <div className={styles.firework}></div>
    </div>
  </div>
);
