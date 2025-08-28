import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

import { engineApi } from '../../api';

export type CarState = {
  id: number;
  distance: number;
  velocity: number;
  time?: number;
  animationId?: number;
};

type RaceState = {
  isRacing: boolean;
  carsState: CarState[];
  winnerId?: number;
};

const initialState: RaceState = {
  isRacing: false,
  carsState: [],
  winnerId: undefined,
};

export const startEngine = createAsyncThunk('race/startEngine', async (id: number) => {
  const response: { distance: number; velocity: number } = await engineApi.controlEngine(
    id,
    'started'
  );
  return { id, ...response };
});

export const drive = createAsyncThunk('race/drive', async (id: number) => {
  const response: { success: boolean } = await engineApi.driveEngine(id);
  return { id, ...response };
});

export const stopEngine = createAsyncThunk('race/stopEngine', async (id: number) => {
  const response: { distance: number; velocity: number } = await engineApi.controlEngine(
    id,
    'stopped'
  );
  return { id, ...response };
});

const raceSlice = createSlice({
  name: 'race',
  initialState,
  reducers: {
    startRace(state) {
      state.isRacing = true;
      state.winnerId = undefined;
    },
    stopRace(state) {
      state.isRacing = false;
      state.carsState.forEach((car) => {
        if (car.animationId) {
          cancelAnimationFrame(car.animationId);
          car.animationId = undefined;
        }
      });
    },
    setCarAnimationId(state, action: PayloadAction<{ id: number; animationId?: number }>) {
      const car = state.carsState.find((c) => c.id === action.payload.id);
      if (car) car.animationId = action.payload.animationId;
    },
    finishCar(state, action: PayloadAction<{ id: number }>) {
      const car = state.carsState.find((c) => c.id === action.payload.id);
      if (car && car.animationId) {
        cancelAnimationFrame(car.animationId);
        car.animationId = undefined;
      }
      if (!state.winnerId) {
        state.winnerId = action.payload.id;
      }
    },
    resetRace: (state) => {
      state.isRacing = false;
      state.carsState.forEach((car) => {
        if (car.animationId) {
          cancelAnimationFrame(car.animationId);
          car.animationId = undefined;
        }
        car.time = undefined;
      });
      state.carsState = [];
      state.isRacing = false;
      state.winnerId = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startEngine.fulfilled, (state, action: PayloadAction<CarState>) => {
        const time = action.payload.distance / action.payload.velocity;
        state.carsState.push({ ...action.payload, time });
      })
      .addCase(
        drive.fulfilled,
        (state, action: PayloadAction<{ id: number; success: boolean }>) => {
          const car = state.carsState.find((c) => c.id === action.payload.id);
          if (car && !action.payload.success && car.animationId) {
            cancelAnimationFrame(car.animationId);
            car.animationId = undefined;
          }
        }
      )
      .addCase(drive.rejected, (state, action) => {
        const id = action.meta.arg as number;
        const car = state.carsState.find((c) => c.id === id);
        if (car && car.animationId) {
          cancelAnimationFrame(car.animationId);
          car.animationId = undefined;
        }
      })
      .addCase(stopEngine.fulfilled, (state, action: PayloadAction<CarState>) => {
        const car = state.carsState.find((c) => c.id === action.payload.id);
        if (car) {
          car.distance = action.payload.distance;
          car.velocity = action.payload.velocity;

          if (car.animationId) {
            cancelAnimationFrame(car.animationId);
            car.animationId = undefined;
          }
        }
      });
  },
});

export const { startRace, stopRace, setCarAnimationId, finishCar, resetRace } = raceSlice.actions;
export default raceSlice.reducer;
