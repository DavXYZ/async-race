import React from 'react';

import styles from './CarItem.module.css';
import CarVisual from './CarVisual';
import CarControls from './CarControls';
import CarInfo from './CarInfo';
import type { CarItemProps } from './car_item_types';

const CarItem: React.FC<CarItemProps> = ({
  carInfo,
  onSelect,
  onDelete,
  isSelected,
  disabled,
  isBroken,
  carRef,
  isRacing,
  isDriving,
  startCar,
  stopCarManually,
}: CarItemProps) => {
  return (
    <div className={`${styles.carItem} ${isSelected ? styles.selected : ''} animate-fade-in`}>
      <CarVisual car={carInfo} isBroken={isBroken} carRef={carRef} />
      <CarControls
        disabled={disabled}
        isRacing={isRacing}
        isDriving={isDriving}
        onStart={startCar}
        onStop={stopCarManually}
        onSelect={onSelect}
        onDelete={onDelete}
      />
      <CarInfo car={carInfo} />
    </div>
  );
};

export default CarItem;
