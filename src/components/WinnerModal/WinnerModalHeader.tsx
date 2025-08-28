import type React from 'react';
import type { JSX } from 'react';

import styles from './WinnerModal.module.css';
import { createConfetti } from './confetti';
import type { WinnerModalHF } from './winner_modal_types';

export const WinnerModalHeader: React.FC<WinnerModalHF> = ({ onClose }): JSX.Element => {
  const confetti = createConfetti();

  return (
    <div className={styles.header}>
      <div className={styles.confetti}>
        {confetti.map((c, i) => (
          <div
            key={i}
            className={styles.confettiPiece}
            style={{ left: c.left, animationDelay: c.delay, backgroundColor: c.color }}
          />
        ))}
      </div>
      <h2 className={styles.title}>🏆 Race Winner!</h2>
      <button onClick={onClose} className={styles.closeButton}>
        ×
      </button>
    </div>
  );
};
