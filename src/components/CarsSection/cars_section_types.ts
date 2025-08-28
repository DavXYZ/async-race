import type { Car } from '../../types';

export type CarsSectionProps = {
  cars: Car[];
  currentPage: number;
  totalPages: number;
  selectedCar: Car | null;
  loading: boolean;
  onSelectCar: (carId: number) => void;
  onDeleteCar: (carId: number) => Promise<void>;
  onPageChange: (page: number) => void;
};
