import React from 'react';
import { Formik, Form, type FormikHelpers } from 'formik';
import * as Yup from 'yup';

import styles from './CarForm.module.css';
import CarNameField from './CarNameField';
import CarColorField from './CarColorField';
import CarFormButtons from './CarFormButtons';
interface CarFormProps {
  onSubmit: (name: string, color: string) => void;
  initialName?: string;
  initialColor?: string;
  isEditing?: boolean;
  onCancel?: () => void;
}

interface FormValues {
  name: string;
  color: string;
}

const CAR_NAME_MAX_LENGTH = 50;

const validationSchema = Yup.object({
  name: Yup.string().trim().required('Car name is required').max(CAR_NAME_MAX_LENGTH),
  color: Yup.string().required('Color is required'),
});

const CarForm: React.FC<CarFormProps> = ({
  onSubmit,
  initialName = '',
  initialColor = '#FF6B6B',
  isEditing = false,
  onCancel,
}) => {
  const initialValues: FormValues = { name: initialName, color: initialColor };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>{isEditing ? 'Update Car' : 'Create New Car'}</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
          onSubmit(values.name.trim(), values.color);
          if (!isEditing) resetForm();
        }}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form className={styles.form}>
            <CarNameField maxLength={CAR_NAME_MAX_LENGTH} />
            <CarColorField color={values.color} setFieldValue={setFieldValue} />
            <CarFormButtons
              isEditing={isEditing}
              resetFields={() => {
                setFieldValue('name', initialName);
                setFieldValue('color', initialColor);
                onCancel?.();
              }}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CarForm;
