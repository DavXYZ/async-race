import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState, AppDispatch } from '../../redux/store';
import type { CarState } from '../../redux/slices/raceSlice';
import {
  drive,
  finishCar,
  setCarAnimationId,
  startEngine,
  stopEngine,
  stopRace,
} from '../../redux/slices/raceSlice';
import { saveWinner } from '../../redux/slices/winnersSlice';

import CarItem from './CarItem';
import type { OwnProps } from './car_item_types';
const SECOND_IN_MS = 1000;
const DISTANCE_PX = 500;

type Props = OwnProps;

const CarItemContainer: React.FC<Props> = ({
  carInfo,
  onSelect,
  onDelete,
  isSelected,
  disabled,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const isRacing = useSelector((state: RootState) => state.race.isRacing);
  const car = useSelector((state: RootState) =>
    state.race.carsState.find((c: CarState) => c.id === carInfo.id)
  );

  const carRef = useRef<HTMLDivElement>(null);
  const [isBroken, setBroken] = useState(false);
  const [isDriving, setIsDriving] = useState(false);

  useEffect(() => {
    return (): void => {
      if (car?.animationId) cancelAnimationFrame(car.animationId);
    };
  }, [car?.animationId]);

  useEffect(() => {
    if (!isRacing) stopCarAndReset();
    else startCar();
  }, [isRacing]);

  const startCar = async (): Promise<void> => {
    try {
      if (isBroken) setBroken(false);
      setIsDriving(true);

      const engineAction = await dispatch(startEngine(carInfo.id)).unwrap();
      const driveAction = await dispatch(drive(carInfo.id)).unwrap();

      if (driveAction.success && carRef.current) {
        const distancePx = carRef.current.parentElement?.offsetWidth || DISTANCE_PX;
        const duration = (engineAction.distance / engineAction.velocity) * SECOND_IN_MS;
        const startTime = performance.now();

        const animate = (timestamp: number): void => {
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
            dispatch(saveWinner({ carId: carInfo.id, time: duration / SECOND_IN_MS }));
            dispatch(stopRace());
            setIsDriving(false);
            stopCarAndReset();
          }
        };

        const id = requestAnimationFrame(animate);
        dispatch(setCarAnimationId({ id: carInfo.id, animationId: id }));
      } else {
        setIsDriving(false);
        setBroken(true);
      }
    } catch {
      setIsDriving(false);
      setBroken(true);
    }
  };

  const stopCarAndReset = async (): Promise<void> => {
    // If stopEngine is a thunk, unwrap to surface errors; otherwise just await dispatch(...)
    try {
      await dispatch(stopEngine(carInfo.id)).unwrap();
    } catch {
      // ignore stop error for reset flow
    }

    if (car?.animationId) {
      cancelAnimationFrame(car.animationId);
      dispatch(setCarAnimationId({ id: carInfo.id, animationId: undefined }));
    }
    if (carRef.current) carRef.current.style.transform = `translateX(0)`;
    setIsDriving(false);
    setBroken(false);
  };

  const stopCarManually = async (): Promise<void> => {
    await stopCarAndReset();
    setBroken(false);
    setIsDriving(false);
  };

  return (
    <CarItem
      carInfo={carInfo}
      onSelect={onSelect}
      onDelete={onDelete}
      isSelected={isSelected}
      disabled={disabled}
      carRef={carRef}
      isBroken={isBroken}
      isRacing={isRacing}
      isDriving={isDriving}
      startCar={startCar}
      stopCarManually={stopCarManually}
    />
  );
};

export default CarItemContainer;
