import type { Car } from '../../types';

export type GarageControlsProps = {
  isEditing: boolean;
  selectedCar: Car | null;
  onCreateCar: (name: string, color: string) => Promise<void>;
  onUpdateCar: (name: string, color: string) => Promise<void>;
  onCancelEdit: () => void;
  onGenerateRandomCars: () => Promise<void>;
  loading: boolean;
};
