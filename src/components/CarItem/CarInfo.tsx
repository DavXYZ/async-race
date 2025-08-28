import React from 'react';

import styles from './CarItem.module.css';
import type { CarInfoProps } from './car_item_types';

const CarInfo: React.FC<CarInfoProps> = ({ car }) => (
  <div className={styles.carDetails}>
    <h4 className={styles.carName}>{car.name}</h4>
    <div className={styles.carId}>ID: {car.id}</div>
    <div className={styles.colorBadge} style={{ backgroundColor: car.color }}></div>
  </div>
);

export default CarInfo;
