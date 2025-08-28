import React from 'react';
import { Field, ErrorMessage } from 'formik';

import styles from './CarForm.module.css';

const MAX_NAME_LENGTH = 50;

interface CarNameFieldProps {
  maxLength?: number;
}

const CarNameField: React.FC<CarNameFieldProps> = ({ maxLength = MAX_NAME_LENGTH }) => (
  <div className={styles.inputGroup}>
    <label htmlFor="name" className={styles.label}>
      Car Name
    </label>
    <Field
      id="name"
      name="name"
      type="text"
      placeholder="Enter car name..."
      className={styles.input}
      maxLength={maxLength}
    />
    <ErrorMessage name="name" component="div" className={styles.error} />
  </div>
);

export default CarNameField;
