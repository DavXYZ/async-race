import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
  type ActionReducerMapBuilder,
} from '@reduxjs/toolkit';

import { carsApi } from '../../api';
import type { Car, CreateCarRequest, UpdateCarRequest, PaginationParams } from '../../types';

interface CarsState {
  cars: Car[];
  totalCount: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  selectedCar: Car | null;
}

const initialState: CarsState = {
  cars: [],
  totalCount: 0,
  currentPage: 1,
  loading: false,
  error: null,
  selectedCar: null,
};

export const fetchCars = createAsyncThunk<
  { cars: Car[]; totalCount: number },
  PaginationParams | undefined
>('cars/fetchCars', async (params) => {
  return await carsApi.getCars(params);
});

export const createCar = createAsyncThunk<Car, CreateCarRequest>(
  'cars/createCar',
  async (carData) => {
    return await carsApi.createCar(carData);
  }
);

export const updateCar = createAsyncThunk<Car, { id: number; carData: UpdateCarRequest }>(
  'cars/updateCar',
  async ({ id, carData }) => {
    return await carsApi.updateCar(id, carData);
  }
);

export const deleteCar = createAsyncThunk<number, number>('cars/deleteCar', async (id) => {
  await carsApi.deleteCar(id);
  return id;
});

export const createRandomCars = createAsyncThunk<Car[], number>(
  'cars/createRandomCars',
  async (count) => {
    const { generateRandomCars } = await import('../../api');
    const randomCars = generateRandomCars(count);
    return await Promise.all(randomCars.map((carData) => carsApi.createCar(carData)));
  }
);

const handleFetchCars = (builder: ActionReducerMapBuilder<CarsState>): void => {
  builder
    .addCase(fetchCars.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(
      fetchCars.fulfilled,
      (state, action: PayloadAction<{ cars: Car[]; totalCount: number }>) => {
        state.loading = false;
        state.cars = action.payload.cars;
        state.totalCount = action.payload.totalCount;
      }
    )
    .addCase(fetchCars.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || 'Failed to fetch cars';
    });
};

const handleCreateCar = (builder: ActionReducerMapBuilder<CarsState>): void => {
  builder
    .addCase(createCar.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createCar.fulfilled, (state, action: PayloadAction<Car>) => {
      state.loading = false;
      state.cars.push(action.payload);
      state.totalCount += 1;
    })
    .addCase(createCar.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || 'Failed to create car';
    });
};

const handleUpdateCar = (builder: ActionReducerMapBuilder<CarsState>): void => {
  builder.addCase(updateCar.fulfilled, (state, action: PayloadAction<Car>) => {
    const index = state.cars.findIndex((car) => car.id === action.payload.id);
    if (index !== -1) state.cars[index] = action.payload;
    if (state.selectedCar?.id === action.payload.id) state.selectedCar = action.payload;
  });
};

const handleDeleteCar = (builder: ActionReducerMapBuilder<CarsState>): void => {
  builder.addCase(deleteCar.fulfilled, (state, action: PayloadAction<number>) => {
    state.cars = state.cars.filter((car) => car.id !== action.payload);
    state.totalCount -= 1;
    if (state.selectedCar?.id === action.payload) state.selectedCar = null;
  });
};

const handleCreateRandomCars = (builder: ActionReducerMapBuilder<CarsState>): void => {
  builder
    .addCase(createRandomCars.pending, (state): void => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createRandomCars.fulfilled, (state, action: PayloadAction<Car[]>) => {
      state.loading = false;
      state.totalCount += action.payload.length;
    })
    .addCase(createRandomCars.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || 'Failed to create random cars';
    });
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    selectCar: (state, action: PayloadAction<Car | null>) => {
      state.selectedCar = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<CarsState>) => {
    handleFetchCars(builder);
    handleCreateCar(builder);
    handleUpdateCar(builder);
    handleDeleteCar(builder);
    handleCreateRandomCars(builder);
  },
});

export const { setCurrentPage, selectCar, clearError } = carsSlice.actions;
export default carsSlice.reducer;
