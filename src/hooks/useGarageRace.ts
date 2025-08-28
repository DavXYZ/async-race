import { generateRandomCarsHandler } from '../components/Garage/garageHandlers';
import type { PropsFromRedux } from '../components/Garage/GarageContainer.tsx';

export function useGarageRace(props: PropsFromRedux): {
  handleGenerateRandomCars: () => Promise<void>;
} {
  const handleGenerateRandomCars = (): Promise<void> =>
    generateRandomCarsHandler(props.createRandomCars, props.fetchData, props.currentPage);

  return { handleGenerateRandomCars };
}
