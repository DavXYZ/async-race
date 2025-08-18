import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Car, CarRaceState, EngineResponse } from "../../types"
import { engineApi } from "../../api"

interface RaceState {
    isRacing: boolean
    winner: Car | null
    carStates: Record<number, CarRaceState>
    raceStartTime: number | null
    loading: boolean
    error: string | null
}

const initialState: RaceState = {
    isRacing: false,
    winner: null,
    carStates: {},
    raceStartTime: null,
    loading: false,
    error: null,
}

export const startEngine = createAsyncThunk(
    "race/startEngine",
    async (carId: number): Promise<{ carId: number; engineData: EngineResponse }> => {
        const engineData = await engineApi.controlEngine(carId, "started")
        return { carId, engineData }
    },
)

export const stopEngine = createAsyncThunk("race/stopEngine", async (carId: number) => {
    await engineApi.controlEngine(carId, "stopped")
    return carId
})

export const driveEngine = createAsyncThunk("race/driveEngine", async (carId: number) => {
    try {
        await engineApi.driveEngine(carId)
        return { carId, success: true }
    } catch (error) {
        return { carId, success: false }
    }
})

export const startRace = createAsyncThunk("race/startRace", async (cars: Car[], { dispatch }) => {
    const startTime = Date.now()

    const enginePromises = cars.map((car) => dispatch(startEngine(car.id)))
    await Promise.all(enginePromises)

    const drivePromises = cars.map((car) => dispatch(driveEngine(car.id)))
    await Promise.all(drivePromises)

    return { cars, startTime }
})

const raceSlice = createSlice({
    name: "race",
    initialState,
    reducers: {
        resetRace: (state) => {
            state.isRacing = false
            state.winner = null
            state.carStates = {}
            state.raceStartTime = null
            state.error = null
        },
        setWinner: (state, action: PayloadAction<Car>) => {
            if (!state.winner) {
                state.winner = action.payload
                state.isRacing = false
            }
        },
        updateCarPosition: (state, action: PayloadAction<{ carId: number; position: number }>) => {
            const { carId, position } = action.payload
            if (state.carStates[carId]) {
                state.carStates[carId].position = position
            }
        },
        setCarAnimationId: (state, action: PayloadAction<{ carId: number; animationId: number }>) => {
            const { carId, animationId } = action.payload
            if (state.carStates[carId]) {
                state.carStates[carId].animationId = animationId
            }
        },
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(startEngine.pending, (state, action) => {
                const carId = action.meta.arg
                state.carStates[carId] = {
                    id: carId,
                    isStarted: false,
                    isDriving: false,
                    position: 0,
                }
            })
            .addCase(startEngine.fulfilled, (state, action) => {
                const { carId } = action.payload
                if (state.carStates[carId]) {
                    state.carStates[carId].isStarted = true
                }
            })
            .addCase(startEngine.rejected, (state, action) => {
                state.error = action.error.message || "Failed to start engine"
            })
            .addCase(stopEngine.fulfilled, (state, action) => {
                const carId = action.payload
                if (state.carStates[carId]) {
                    state.carStates[carId].isStarted = false
                    state.carStates[carId].isDriving = false
                    state.carStates[carId].position = 0
                    if (state.carStates[carId].animationId) {
                        cancelAnimationFrame(state.carStates[carId].animationId!)
                    }
                }
            })
            .addCase(driveEngine.fulfilled, (state, action) => {
                const { carId, success } = action.payload
                if (state.carStates[carId]) {
                    state.carStates[carId].isDriving = success
                    if (!success) {
                        // Engine broke down
                        state.carStates[carId].isStarted = false
                    }
                }
            })
            .addCase(startRace.pending, (state) => {
                state.loading = true
                state.isRacing = true
                state.winner = null
                state.raceStartTime = Date.now()
            })
            .addCase(startRace.fulfilled, (state, action) => {
                state.loading = false
                state.raceStartTime = action.payload.startTime
            })
            .addCase(startRace.rejected, (state, action) => {
                state.loading = false
                state.isRacing = false
                state.error = action.error.message || "Failed to start race"
            })
    },
})

export const { resetRace, setWinner, updateCarPosition, setCarAnimationId, clearError } = raceSlice.actions

export default raceSlice.reducer
