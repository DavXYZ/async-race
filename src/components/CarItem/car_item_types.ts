import React from 'react';

import type { Car } from '../../types';
import type { CarState } from '../../redux/slices/raceSlice';

export interface CarVisualProps {
  car: Car;
  isBroken: boolean;
  carRef: React.RefObject<HTMLDivElement | null>;
}

export interface OwnProps {
  carInfo: Car;
  onSelect: () => void;
  onDelete: () => void;
  isSelected: boolean;
  disabled: boolean;
}

export interface MapStateReturn {
  isRacing: boolean;
  car?: CarState;
}

export interface CarItemProps {
  carInfo: Car;
  onSelect: () => void;
  onDelete: () => void;
  isSelected: boolean;
  disabled: boolean;
  isBroken: boolean;
  carRef: React.RefObject<HTMLDivElement | null>;
  isRacing: boolean;
  isDriving: boolean;

  startCar: () => void;
  stopCarManually: () => void;
}

export interface CarInfoProps {
  car: Car;
}

export interface CarControlsProps {
  disabled: boolean;
  isRacing: boolean;
  isDriving: boolean;
  onStart: () => void;
  onStop: () => void;
  onSelect: () => void;
  onDelete: () => void;
}
