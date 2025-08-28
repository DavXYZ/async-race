import type React from 'react';
import type { JSX } from 'react';

import styles from './WinnerModal.module.css';
import type { WinnerModalHF } from './winner_modal_types';

export const WinnerModalFooter: React.FC<WinnerModalHF> = ({ onClose }): JSX.Element => (
  <div className={styles.footer}>
    <button onClick={onClose} className={styles.button}>
      Awesome!
    </button>
  </div>
);
