import type React from 'react';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  fetchCars,
  createCar,
  updateCar,
  deleteCar,
  createRandomCars,
  setCurrentPage,
  selectCar,
} from '@/redux/slices/carsSlice';
import { API_CONFIG } from '@/api/constants';
import CarForm from '../../components/CarForm/CarForm';
import RaceControls from '../../components/RaceControls/RaceControls';
import CarItem from '../../components/CarItem/CarItem';
import Pagination from '../../components/Pagination/Pagination';
import WinnerModal from '../../components/WinnerModal/WinnerModal';
import { resetRace } from '@/redux/slices/raceSlice';

import styles from './Garage.module.css';

const Garage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cars, totalCount, currentPage, loading, error, selectedCar } = useAppSelector(
    (state) => state.cars
  );
  const winnerId = useAppSelector((state) => state.race.winnerId);
  const winner = cars.find((c) => c.id === winnerId);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(
      fetchCars({
        page: currentPage,
        limit: API_CONFIG.PAGINATION.GARAGE_PAGE_SIZE,
      })
    );
  }, [dispatch, currentPage]);

  const handleCreateCar = async (name: string, color: string) => {
    await dispatch(createCar({ name, color }));
    dispatch(
      fetchCars({
        page: currentPage,
        limit: API_CONFIG.PAGINATION.GARAGE_PAGE_SIZE,
      })
    );
  };

  const handleUpdateCar = async (name: string, color: string) => {
    if (selectedCar) {
      await dispatch(
        updateCar({
          id: selectedCar.id,
          carData: { name, color },
        })
      );
      setIsEditing(false);
      dispatch(selectCar(null));
      dispatch(
        fetchCars({
          page: currentPage,
          limit: API_CONFIG.PAGINATION.GARAGE_PAGE_SIZE,
        })
      );
    }
  };

  const handleSelectCar = (carId: number) => {
    const car = cars.find((c) => c.id === carId);
    if (car) {
      dispatch(selectCar(car));
      setIsEditing(true);
    }
  };

  const handleDeleteCar = async (carId: number) => {
    await dispatch(deleteCar(carId));

    const remainingCars = cars.length - 1;
    if (remainingCars === 0 && currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    } else {
      dispatch(
        fetchCars({
          page: currentPage,
          limit: API_CONFIG.PAGINATION.GARAGE_PAGE_SIZE,
        })
      );
    }
  };

  const handleGenerateRandomCars = async () => {
    await dispatch(createRandomCars(100));
    dispatch(
      fetchCars({
        page: currentPage,
        limit: API_CONFIG.PAGINATION.GARAGE_PAGE_SIZE,
      })
    );
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const totalPages = Math.ceil(totalCount / API_CONFIG.PAGINATION.GARAGE_PAGE_SIZE);

  return (
    <div className={styles.garage}>
      <div className={styles.header}>
        <h2 className={styles.title}>Garage</h2>
        <div className={styles.carCount}>
          Cars in garage: <span className={styles.count}>{totalCount}</span>
        </div>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.controls}>
        <CarForm
          onSubmit={isEditing ? handleUpdateCar : handleCreateCar}
          initialName={selectedCar?.name || ''}
          initialColor={selectedCar?.color || '#FF6B6B'}
          isEditing={isEditing}
          onCancel={() => {
            setIsEditing(false);
            dispatch(selectCar(null));
          }}
        />

        <RaceControls onGenerateRandomCars={handleGenerateRandomCars} disabled={loading} />
      </div>

      <div className={styles.carsSection}>
        <h3 className={styles.sectionTitle}>Page {currentPage}</h3>

        {loading && cars.length === 0 ? (
          <div className={styles.loading}>Loading cars...</div>
        ) : cars.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🚗</div>
            <h3>No Cars in Garage</h3>
            <p>Create your first car or generate random cars to get started!</p>
          </div>
        ) : (
          <div className={styles.carsList}>
            {cars.map((car) => (
              <CarItem
                key={car.id}
                carInfo={car}
                onSelect={() => handleSelectCar(car.id)}
                onDelete={() => handleDeleteCar(car.id)}
                isSelected={selectedCar?.id === car.id}
                disabled={loading}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      {winner && <WinnerModal winner={winner} onClose={() => dispatch(resetRace())} />}
    </div>
  );
};

export default Garage;
