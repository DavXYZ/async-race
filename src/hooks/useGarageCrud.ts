import { useState } from 'react';

import {
  createCarHandler,
  updateCarHandler,
  selectCarHandler,
  deleteCarHandler,
} from '../components/Garage/garageHandlers';
import type { PropsFromRedux } from '../components/Garage/GarageContainer.tsx';

type UseGarageCrud = {
  isEditing: boolean;
  handleCreateCar: (name: string, color: string) => Promise<void>;
  handleUpdateCar: (name: string, color: string) => Promise<void>;
  handleSelectCar: (carId: number) => void;
  handleDeleteCar: (carId: number) => Promise<void>;
  handleCancelEdit: () => void;
};

export function useGarageCrud(props: PropsFromRedux): UseGarageCrud {
  const [isEditing, setIsEditing] = useState(false);
  const handleCreateCar = (name: string, color: string): Promise<void> =>
    createCarHandler(name, color, props.createCar, props.fetchData, props.currentPage);
  const handleUpdateCar = (name: string, color: string): Promise<void> =>
    updateCarHandler(
      name,
      color,
      props.selectedCar,
      props.updateCar,
      setIsEditing,
      props.selectCar,
      props.fetchData,
      props.currentPage
    );
  const handleSelectCar = (carId: number): void =>
    selectCarHandler(carId, props.cars, props.selectCar, setIsEditing);
  const handleDeleteCar = (carId: number): Promise<void> =>
    deleteCarHandler(
      carId,
      props.cars,
      props.deleteCar,
      props.currentPage,
      props.setCurrentPage,
      props.fetchData
    );
  const handleCancelEdit = (): void => {
    setIsEditing(false);
    props.selectCar(null);
  };
  return {
    isEditing,
    handleCreateCar,
    handleUpdateCar,
    handleSelectCar,
    handleDeleteCar,
    handleCancelEdit,
  };
}
