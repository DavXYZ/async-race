import type { Car } from '../../types';

export const createCarHandler = async (
  name: string,
  color: string,
  createCar: (name: string, color: string) => Promise<void>,
  fetchData: (page: number) => void,
  currentPage: number
): Promise<void> => {
  await createCar(name, color);
  fetchData(currentPage);
};

export const updateCarHandler = async (
  name: string,
  color: string,
  selectedCar: Car | null,
  updateCar: (id: number, name: string, color: string) => Promise<void>,
  setIsEditing: (val: boolean) => void,
  selectCar: (car: Car | null) => void,
  fetchData: (page: number) => void,
  currentPage: number
): Promise<void> => {
  if (selectedCar) {
    await updateCar(selectedCar.id, name, color);
    setIsEditing(false);
    selectCar(null);
    fetchData(currentPage);
  }
};

export const selectCarHandler = (
  carId: number,
  cars: Car[],
  selectCar: (car: Car | null) => void,
  setIsEditing: (val: boolean) => void
): void => {
  const car = cars.find((c) => c.id === carId);
  if (car) {
    selectCar(car);
    setIsEditing(true);
  }
};

export const deleteCarHandler = async (
  carId: number,
  cars: Car[],
  deleteCar: (carId: number) => Promise<void>,
  currentPage: number,
  setCurrentPage: (page: number) => void,
  fetchData: (page: number) => void
): Promise<void> => {
  await deleteCar(carId);
  const remainingCars = cars.length - 1;
  if (remainingCars === 0 && currentPage > 1) {
    setCurrentPage(currentPage - 1);
  } else {
    fetchData(currentPage);
  }
};

export const generateRandomCarsHandler = async (
  createRandomCars: () => Promise<void>,
  fetchData: (page: number) => void,
  currentPage: number
): Promise<void> => {
  await createRandomCars();
  fetchData(currentPage);
};
