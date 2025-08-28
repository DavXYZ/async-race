import type React from 'react';

import styles from '../Garage/Garage.module.css';
import RaceControls from '../../components/RaceControls/RaceControls';
import CarForm from '../../components/CarForm/CarForm';

import type { GarageControlsProps } from './garage_controls_types';

const GarageControls: React.FC<GarageControlsProps> = ({
  isEditing,
  selectedCar,
  onCreateCar,
  onUpdateCar,
  onCancelEdit,
  onGenerateRandomCars,
  loading,
}) => (
  <div className={styles.controls}>
    <CarForm
      onSubmit={isEditing ? onUpdateCar : onCreateCar}
      initialName={selectedCar?.name || ''}
      initialColor={selectedCar?.color || '#FF6B6B'}
      isEditing={isEditing}
      onCancel={onCancelEdit}
    />
    <RaceControls onGenerateRandomCars={onGenerateRandomCars} disabled={loading} />
  </div>
);

export default GarageControls;
