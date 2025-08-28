import type React from 'react';

import WinnerModal from '../../components/WinnerModal/WinnerModal';
import type { GarageUIProps } from '../../types';
import GarageHeader from '../../components/GarageHeader/GarageHeader';
import GarageControls from '../../components/GarageControls/GarageContols';
import CarsSection from '../../components/CarsSection/CarsSection';

import styles from './Garage.module.css';

const CARS_PER_PAGE = 7;

const Garage: React.FC<GarageUIProps> = (props) => {
  const totalPages = Math.ceil(props.totalCount / CARS_PER_PAGE);

  return (
    <div className={styles.garage}>
      <GarageHeader totalCount={props.totalCount} />
      {props.error && <div className={styles.error}>{props.error}</div>}
      <GarageControls
        isEditing={props.isEditing}
        selectedCar={props.selectedCar}
        onCreateCar={props.onCreateCar}
        onUpdateCar={props.onUpdateCar}
        onCancelEdit={props.onCancelEdit}
        onGenerateRandomCars={props.onGenerateRandomCars}
        loading={props.loading}
      />
      <CarsSection
        cars={props.cars}
        currentPage={props.currentPage}
        totalPages={totalPages}
        selectedCar={props.selectedCar}
        loading={props.loading}
        onSelectCar={props.onSelectCar}
        onDeleteCar={props.onDeleteCar}
        onPageChange={props.onPageChange}
      />
      {props.winner && <WinnerModal winner={props.winner} onClose={props.onCloseWinnerModal} />}
    </div>
  );
};

export default Garage;
