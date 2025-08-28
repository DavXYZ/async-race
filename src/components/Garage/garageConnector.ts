import type { PayloadAction } from '@reduxjs/toolkit';

import type { AppDispatch, RootState } from '../../redux/store';
import { API_CONFIG } from '../../api/constants';
import {
  fetchCars,
  createCar,
  updateCar,
  deleteCar,
  createRandomCars,
  setCurrentPage,
  selectCar,
} from '../../redux/slices/carsSlice';
import { resetRace } from '../../redux/slices/raceSlice';
import type { Car } from '../../types';

const GENERATE_CARS_COUNT = 100;

type mapStateReturnType = {
  cars: Car[];
  totalCount: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  selectedCar: Car | null;
  winner: Car | undefined;
};

type MapDispatch = {
  fetchData: (page: number) => void;
  createCar: (name: string, color: string) => Promise<void>;
  updateCar: (id: number, name: string, color: string) => Promise<void>;
  deleteCar: (carId: number) => Promise<void>;
  createRandomCars: () => Promise<void>;
  setCurrentPage: (page: number) => PayloadAction<number, 'cars/setCurrentPage'>;
  selectCar: (car: Car | null) => PayloadAction<Car | null, 'cars/selectCar'>;
  resetRace: () => void;
};

export const mapState = (state: RootState): mapStateReturnType => {
  const winnerId = state.race.winnerId;
  return {
    cars: state.cars.cars,
    totalCount: state.cars.totalCount,
    currentPage: state.cars.currentPage,
    loading: state.cars.loading,
    error: state.cars.error,
    selectedCar: state.cars.selectedCar,
    winner: state.cars.cars.find((c) => c.id === winnerId),
  };
};

export const mapDispatch = (dispatch: AppDispatch): MapDispatch => ({
  fetchData: (page: number): void =>
    void dispatch(fetchCars({ page, limit: API_CONFIG.PAGINATION.GARAGE_PAGE_SIZE })),
  createCar: async (name: string, color: string): Promise<void> => {
    await dispatch(createCar({ name, color }));
  },
  updateCar: async (id: number, name: string, color: string): Promise<void> => {
    await dispatch(updateCar({ id, carData: { name, color } }));
  },
  deleteCar: async (carId: number): Promise<void> => {
    await dispatch(deleteCar(carId));
  },
  createRandomCars: async (): Promise<void> => {
    await dispatch(createRandomCars(GENERATE_CARS_COUNT));
  },
  setCurrentPage: (page: number): PayloadAction<number, 'cars/setCurrentPage'> =>
    dispatch(setCurrentPage(page)),
  selectCar: (car: Car | null): PayloadAction<Car | null, 'cars/selectCar'> =>
    dispatch(selectCar(car)),
  resetRace: () => dispatch(resetRace()),
});
