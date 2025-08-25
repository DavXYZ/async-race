import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { startRace } from '@/redux/slices/raceSlice';

import styles from './RaceControls.module.css';

interface RaceControlsProps {
  onGenerateRandomCars: () => void;
  disabled: boolean;
}

const RaceControls: React.FC<RaceControlsProps> = ({ onGenerateRandomCars, disabled }) => {
  const dispatch = useAppDispatch();
  const isRacing = useAppSelector((state) => state.race.isRacing);

  const handleStartRace = () => {
    dispatch(startRace());
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
          onClick={() => window.location.reload()}
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
