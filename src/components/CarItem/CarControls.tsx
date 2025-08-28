import React from 'react';

import styles from './CarItem.module.css';
import type { CarControlsProps } from './car_item_types';

const CarControls: React.FC<CarControlsProps> = ({
  disabled,
  isRacing,
  onStart,
  isDriving,
  onStop,
  onSelect,
  onDelete,
}: CarControlsProps) => (
  <div className={styles.controls}>
    <button
      onClick={onStart}
      disabled={disabled || isRacing || isDriving}
      className={styles.startBtn}
    >
      Start
    </button>
    <button onClick={onStop} className={styles.stopBtn} disabled={!isDriving}>
      Stop
    </button>
    <button
      onClick={onSelect}
      disabled={disabled || isRacing}
      className={`${styles.button} ${styles.select}`}
    >
      Select
    </button>
    <button
      onClick={onDelete}
      disabled={disabled || isRacing}
      className={`${styles.button} ${styles.delete}`}
    >
      Delete
    </button>
  </div>
);

export default CarControls;
