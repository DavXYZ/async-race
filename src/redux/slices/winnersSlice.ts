import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

import type {
  CreateWinnerRequest,
  UpdateWinnerRequest,
  PaginationParams,
  SortParams,
  WinnersState,
} from '../../types';
import { winnersApi, carsApi } from '../../api';

const initialState: WinnersState = {
  winners: [],
  totalCount: 0,
  currentPage: 1,
  sortBy: 'id',
  sortOrder: 'ASC',
  loading: false,
  error: null,
};

export const fetchWinners = createAsyncThunk(
  'winners/fetchWinners',
  async (params?: PaginationParams & SortParams) => {
    const response = await winnersApi.getWinners(params);

    const winnersWithCars = await Promise.all(
      response.winners.map(async (winner) => {
        try {
          const car = await carsApi.getCar(winner.id);
          return { ...winner, car };
        } catch (error) {
          return {
            ...winner,
            car: { id: winner.id, name: 'Unknown Car', color: '#cccccc' },
          };
        }
      })
    );

    return { winners: winnersWithCars, totalCount: response.totalCount };
  }
);

export const createWinner = createAsyncThunk(
  'winners/createWinner',
  async (winnerData: CreateWinnerRequest) => {
    const winner = await winnersApi.createWinner(winnerData);
    const car = await carsApi.getCar(winner.id);
    return { ...winner, car };
  }
);

export const updateWinner = createAsyncThunk(
  'winners/updateWinner',
  async ({ id, winnerData }: { id: number; winnerData: UpdateWinnerRequest }) => {
    const winner = await winnersApi.updateWinner(id, winnerData);
    const car = await carsApi.getCar(winner.id);
    return { ...winner, car };
  }
);

export const deleteWinner = createAsyncThunk('winners/deleteWinner', async (id: number) => {
  await winnersApi.deleteWinner(id);
  return id;
});

export const saveWinner = createAsyncThunk(
  'winners/saveWinner',
  async ({ carId, time }: { carId: number; time: number }) => {
    try {
      const existingWinner = await winnersApi.getWinner(carId);

      const updatedData: UpdateWinnerRequest = {
        wins: existingWinner.wins + 1,
        time: time < existingWinner.time ? time : existingWinner.time,
      };

      const winner = await winnersApi.updateWinner(carId, updatedData);
      const car = await carsApi.getCar(winner.id);
      return { ...winner, car };
    } catch (error) {
      const newWinnerData: CreateWinnerRequest = {
        id: carId,
        wins: 1,
        time,
      };

      const winner = await winnersApi.createWinner(newWinnerData);
      const car = await carsApi.getCar(winner.id);
      return { ...winner, car };
    }
  }
);

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSorting: (
      state,
      action: PayloadAction<{ sortBy: 'id' | 'wins' | 'time'; sortOrder: 'ASC' | 'DESC' }>
    ) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWinners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWinners.fulfilled, (state, action) => {
        state.loading = false;
        state.winners = action.payload.winners;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchWinners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch winners';
      })
      .addCase(createWinner.fulfilled, (state, action) => {
        state.winners.push(action.payload);
        state.totalCount += 1;
      })
      .addCase(updateWinner.fulfilled, (state, action) => {
        const index = state.winners.findIndex((winner) => winner.id === action.payload.id);
        if (index !== -1) {
          state.winners[index] = action.payload;
        }
      })
      .addCase(deleteWinner.fulfilled, (state, action) => {
        state.winners = state.winners.filter((winner) => winner.id !== action.payload);
        state.totalCount -= 1;
      })
      .addCase(saveWinner.fulfilled, (state, action) => {
        const index = state.winners.findIndex((winner) => winner.id === action.payload.id);
        if (index !== -1) {
          state.winners[index] = action.payload;
        } else {
          state.winners.push(action.payload);
          state.totalCount += 1;
        }
      });
  },
});

export const { setCurrentPage, setSorting, clearError } = winnersSlice.actions;
export default winnersSlice.reducer;
