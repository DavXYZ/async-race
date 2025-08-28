import type React from 'react';
import { connect, type ConnectedProps } from 'react-redux';

import { useGarageFetch } from '../../hooks/useGarageFetch';
import { useGarageCrud } from '../../hooks/useGarageCrud';
import { useGarageRace } from '../../hooks/useGarageRace';

import { mapState, mapDispatch } from './garageConnector';
import Garage from './Garage';

const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;

const GarageContainer: React.FC<PropsFromRedux> = (props) => {
  useGarageFetch(props);
  const {
    isEditing,
    handleCreateCar,
    handleUpdateCar,
    handleSelectCar,
    handleDeleteCar,
    handleCancelEdit,
  } = useGarageCrud(props);
  const { handleGenerateRandomCars } = useGarageRace(props);

  return (
    <Garage
      cars={props.cars}
      totalCount={props.totalCount}
      currentPage={props.currentPage}
      loading={props.loading}
      error={props.error}
      selectedCar={props.selectedCar}
      winner={props.winner}
      isEditing={isEditing}
      onCreateCar={handleCreateCar}
      onUpdateCar={handleUpdateCar}
      onCancelEdit={handleCancelEdit}
      onDeleteCar={handleDeleteCar}
      onSelectCar={handleSelectCar}
      onGenerateRandomCars={handleGenerateRandomCars}
      onPageChange={props.setCurrentPage}
      onCloseWinnerModal={props.resetRace}
    />
  );
};

export default connector(GarageContainer);
