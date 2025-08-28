import React from 'react';
import { Field } from 'formik';

import CarSvg from '../../assets/svg/CarSvg';

import styles from './CarForm.module.css';

interface CarColorFieldProps {
  color: string;
  setFieldValue: (field: string, value: string) => void;
}

const CarColorField: React.FC<CarColorFieldProps> = ({ color, setFieldValue }) => (
  <div className={styles.inputGroup}>
    <label htmlFor="color" className={styles.label}>
      Car Color
    </label>
    <div className={styles.colorInputContainer}>
      <Field
        id="color"
        name="color"
        type="color"
        value={color}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFieldValue('color', e.target.value)
        }
        className={styles.colorInput}
      />
      <div className={styles.carPreview}>
        <CarSvg color={color} />
      </div>
    </div>
  </div>
);

export default CarColorField;
