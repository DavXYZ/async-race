import React from 'react';

import CarSvg from '../../assets/svg/CarSvg';
import BrokenCarSvg from '../../assets/svg/BrokenCarSvg';

import styles from './CarItem.module.css';
import type { CarVisualProps } from './car_item_types';

const CarVisual: React.FC<CarVisualProps> = ({ car, isBroken, carRef }) => (
  <div className={styles.road}>
    <div className={styles.car} ref={carRef}>
      {isBroken ? <BrokenCarSvg color={car.color} /> : <CarSvg color={car.color} />}
    </div>
  </div>
);

export default CarVisual;
