import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { resetRace, startRace } from '../../redux/slices/raceSlice';

import styles from './RaceControls.module.css';
import type { RaceControlsProps } from './race_controls_types';

const RaceControls: React.FC<RaceControlsProps> = ({ onGenerateRandomCars, disabled }) => {
  const dispatch = useAppDispatch();
  const isRacing = useAppSelector((state) => state.race.isRacing);
  const handleStartRace: () => void = () => {
    dispatch(startRace());
  };
  const handleResetRace: () => void = () => {
    dispatch(resetRace());
  };
  return (
    <div className={styles.controls}>
      <h3 className={styles.title}>Race Controls</h3>
      <div className={styles.buttonGroup}>
        <button
          onClick={handleStartRace}
          className={`${styles.button} ${styles.start} ${isRacing ? styles.racing : ''}`}
          disabled={isRacing}
        >
          {isRacing ? 'Race in Progress' : 'Start Race'}
        </button>

        <button
          className={`${styles.button} ${styles.reset}`}
          disabled={!isRacing}
          onClick={handleResetRace}
        >
          Reset Race
        </button>

        <button
          onClick={onGenerateRandomCars}
          disabled={disabled || isRacing}
          className={`${styles.button} ${styles.generate}`}
        >
          Generate Cars
        </button>
      </div>
    </div>
  );
};

export default RaceControls;
