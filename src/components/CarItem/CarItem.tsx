import React, { useRef, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  startEngine,
  stopEngine,
  drive,
  setCarAnimationId,
  finishCar,
  stopRace,
} from '../../redux/slices/raceSlice';
import type { CarState } from '../../redux/slices/raceSlice';
import CarSvg from '../../assets/svg/CarSvg';
import BrokenCarSvg from '../../assets/svg/BrokenCarSvg';
import type { Car } from '../../types';
import { saveWinner } from '../../redux/slices/winnersSlice';

import styles from './CarItem.module.css';

interface CarItemProps {
  carInfo: Car;
  onSelect: () => void;
  onDelete: () => void;
  isSelected: boolean;
  disabled: boolean;
}

const CarItem: React.FC<CarItemProps> = ({
  carInfo,
  onSelect,
  onDelete,
  isSelected,
  disabled,
}: CarItemProps) => {
  const dispatch = useAppDispatch();
  const carRef = useRef<HTMLDivElement>(null);
  const [isBroken, setBroken] = useState(false);
  const isRacing = useAppSelector((state) => state.race.isRacing);

  const car: CarState | undefined = useAppSelector((state) =>
    state.race.carsState.find((c) => c.id === carInfo.id)
  );

  useEffect(() => {
    return () => {
      if (car?.animationId) cancelAnimationFrame(car.animationId);
    };
  }, [car?.animationId]);

  useEffect(() => {
    if (isRacing) {
      startCar();
    }
  }, [isRacing]);

  const startCar = async () => {
    try {
      if (isBroken) setBroken(false);
      const engineAction = await dispatch(startEngine(carInfo.id)).unwrap();
      const driveAction = await dispatch(drive(carInfo.id)).unwrap();

      if (driveAction.success && carRef.current) {
        const roadWidth = carRef.current.parentElement?.offsetWidth || 500;
        const distancePx = roadWidth;
        const duration = (engineAction.distance / engineAction.velocity) * 1000;
        const startTime = performance.now();

        const animate = (timestamp: number) => {
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);

          if (carRef.current) {
            carRef.current.style.transform = `translateX(${progress * distancePx}px)`;
          }

          if (progress < 1) {
            const id = requestAnimationFrame(animate);
            dispatch(setCarAnimationId({ id: carInfo.id, animationId: id }));
          } else {
            dispatch(finishCar({ id: carInfo.id }));
            dispatch(saveWinner({ carId: carInfo.id, time: duration / 1000 }));
            dispatch(stopRace());
            stopCarAndReset();
          }
        };

        const id = requestAnimationFrame(animate);
        dispatch(setCarAnimationId({ id: carInfo.id, animationId: id }));
      } else {
        setBroken(true);
      }
    } catch {
      setBroken(true);
    }
  };

  const stopCarAndReset = async () => {
    await dispatch(stopEngine(carInfo.id));
    if (car?.animationId) {
      cancelAnimationFrame(car.animationId);
      dispatch(setCarAnimationId({ id: carInfo.id, animationId: undefined }));
    }
    if (carRef.current) {
      carRef.current.style.transform = `translateX(0)`;
    }
  };

  const stopCarManually = async () => {
    await stopCarAndReset();
    setBroken(false);
  };

  return (
    <div className={`${styles.carItem} ${isSelected ? styles.selected : ''} animate-fade-in`}>
      <div className={styles.road}>
        <div className={styles.car} ref={carRef}>
          {isBroken ? <BrokenCarSvg color={carInfo.color} /> : <CarSvg color={carInfo.color} />}
        </div>
      </div>
      <div className={styles.controls}>
        <button onClick={startCar} disabled={disabled || isRacing} className={styles.startBtn}>
          Start
        </button>
        <button onClick={stopCarManually} className={styles.stopBtn}>
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
        <div className={styles.carDetails}>
          <h4 className={styles.carName}>{carInfo.name}</h4>
          <div className={styles.carId}>ID: {carInfo.id}</div>
          <div className={styles.colorBadge} style={{ backgroundColor: carInfo.color }}></div>
        </div>
      </div>
    </div>
  );
};

export default CarItem;
