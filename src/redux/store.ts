import { configureStore } from "@reduxjs/toolkit"
import carsReducer from "./slices/carsSlice"
import winnersReducer from "./slices/winnersSlice"
import raceReducer from "./slices/raceSlice"

export const store = configureStore({
    reducer: {
        cars: carsReducer,
        winners: winnersReducer,
        race: raceReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
