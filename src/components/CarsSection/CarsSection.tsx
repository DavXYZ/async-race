import type React from 'react';

import Pagination from '../../components/Pagination/Pagination';
import styles from '../Garage/Garage.module.css';
import CarItemContainer from '../../components/CarItem/CarItemContainer';

import type { CarsSectionProps } from './cars_section_types';

const CarsSection: React.FC<CarsSectionProps> = ({
  cars,
  currentPage,
  totalPages,
  selectedCar,
  loading,
  onSelectCar,
  onDeleteCar,
  onPageChange,
}) => (
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
          <CarItemContainer
            key={car.id}
            carInfo={car}
            onSelect={() => onSelectCar(car.id)}
            onDelete={() => onDeleteCar(car.id)}
            isSelected={selectedCar?.id === car.id}
            disabled={loading}
          />
        ))}
      </div>
    )}
    {totalPages > 1 && (
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    )}
  </div>
);

export default CarsSection;
