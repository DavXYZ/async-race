import styles from '../Garage/Garage.module.css';

const GarageHeader: React.FC<{ totalCount: number }> = ({ totalCount }) => (
  <div className={styles.header}>
    <h2 className={styles.title}>Garage</h2>
    <div className={styles.carCount}>
      Cars in garage: <span className={styles.count}>{totalCount}</span>
    </div>
  </div>
);

export default GarageHeader;
