import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Car, CreateCarRequest, UpdateCarRequest, PaginationParams } from "../../types"
import { carsApi } from "../../api"

interface CarsState {
    cars: Car[]
    totalCount: number
    currentPage: number
    loading: boolean
    error: string | null
    selectedCar: Car | null
}

const initialState: CarsState = {
    cars: [],
    totalCount: 0,
    currentPage: 1,
    loading: false,
    error: null,
    selectedCar: null,
}

export const fetchCars = createAsyncThunk("cars/fetchCars", async (params?: PaginationParams) => {
    const response = await carsApi.getCars(params)
    return response
})

export const createCar = createAsyncThunk("cars/createCar", async (carData: CreateCarRequest) => {
    const car = await carsApi.createCar(carData)
    return car
})

export const updateCar = createAsyncThunk(
    "cars/updateCar",
    async ({ id, carData }: { id: number; carData: UpdateCarRequest }) => {
        const car = await carsApi.updateCar(id, carData)
        return car
    },
)

export const deleteCar = createAsyncThunk("cars/deleteCar", async (id: number) => {
    await carsApi.deleteCar(id)
    return id
})

export const createRandomCars = createAsyncThunk("cars/createRandomCars", async (count: number) => {
    const { generateRandomCars } = await import("../../api")
    const randomCars = generateRandomCars(count)

    const createdCars = await Promise.all(randomCars.map((carData) => carsApi.createCar(carData)))

    return createdCars
})

const carsSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        selectCar: (state, action: PayloadAction<Car | null>) => {
            state.selectedCar = action.payload
        },
        clearError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCars.fulfilled, (state, action) => {
                state.loading = false
                state.cars = action.payload.cars
                state.totalCount = action.payload.totalCount
            })
            .addCase(fetchCars.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "Failed to fetch cars"
            })
            .addCase(createCar.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createCar.fulfilled, (state, action) => {
                state.loading = false
                state.cars.push(action.payload)
                state.totalCount += 1
            })
            .addCase(createCar.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "Failed to create car"
            })
            .addCase(updateCar.fulfilled, (state, action) => {
                const index = state.cars.findIndex((car) => car.id === action.payload.id)
                if (index !== -1) {
                    state.cars[index] = action.payload
                }
                if (state.selectedCar?.id === action.payload.id) {
                    state.selectedCar = action.payload
                }
            })
            .addCase(deleteCar.fulfilled, (state, action) => {
                state.cars = state.cars.filter((car) => car.id !== action.payload)
                state.totalCount -= 1
                if (state.selectedCar?.id === action.payload) {
                    state.selectedCar = null
                }
            })
            .addCase(createRandomCars.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createRandomCars.fulfilled, (state, action) => {
                state.loading = false
                state.totalCount += action.payload.length
            })
            .addCase(createRandomCars.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || "Failed to create random cars"
            })
    },
})

export const { setCurrentPage, selectCar, clearError } = carsSlice.actions
export default carsSlice.reducer
