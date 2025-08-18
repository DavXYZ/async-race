import type {
    Car,
    Winner,
    CreateCarRequest,
    UpdateCarRequest,
    CreateWinnerRequest,
    UpdateWinnerRequest,
    GetCarsResponse,
    GetWinnersResponse,
    EngineResponse,
    DriveResponse,
    PaginationParams,
    SortParams,
} from "../types"

const BASE_URL = "http://127.0.0.1:3000"

const apiRequest = async (url: string, options?: RequestInit) => {
    const response = await fetch(`${BASE_URL}${url}`, {
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
        ...options,
    })

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
}

const getTotalCount = (response: Response): number => {
    const totalCount = response.headers.get("X-Total-Count")
    return totalCount ? Number.parseInt(totalCount, 10) : 0
}

export const carsApi = {
    getCars: async (params?: PaginationParams): Promise<GetCarsResponse> => {
        const searchParams = new URLSearchParams()
        if (params?.page) searchParams.append("_page", params.page.toString())
        if (params?.limit) searchParams.append("_limit", params.limit.toString())

        const url = `/garage${searchParams.toString() ? `?${searchParams}` : ""}`
        const response = await fetch(`${BASE_URL}${url}`)

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`)
        }

        const cars = await response.json()
        const totalCount = getTotalCount(response)

        return { cars, totalCount }
    },

    getCar: async (id: number): Promise<Car> => {
        return apiRequest(`/garage/${id}`)
    },

    createCar: async (carData: CreateCarRequest): Promise<Car> => {
        return apiRequest("/garage", {
            method: "POST",
            body: JSON.stringify(carData),
        })
    },

    updateCar: async (id: number, carData: UpdateCarRequest): Promise<Car> => {
        return apiRequest(`/garage/${id}`, {
            method: "PUT",
            body: JSON.stringify(carData),
        })
    },

    deleteCar: async (id: number): Promise<void> => {
        await apiRequest(`/garage/${id}`, {
            method: "DELETE",
        })
    },
}

export const engineApi = {
    controlEngine: async (id: number, status: "started" | "stopped"): Promise<EngineResponse> => {
        const searchParams = new URLSearchParams({
            id: id.toString(),
            status,
        })

        return apiRequest(`/engine?${searchParams}`)
    },

    driveEngine: async (id: number): Promise<DriveResponse> => {
        const searchParams = new URLSearchParams({
            id: id.toString(),
            status: "drive",
        })

        return apiRequest(`/engine?${searchParams}`, {
            method: "PATCH",
        })
    },
}

export const winnersApi = {
    getWinners: async (params?: PaginationParams & SortParams): Promise<GetWinnersResponse> => {
        const searchParams = new URLSearchParams()
        if (params?.page) searchParams.append("_page", params.page.toString())
        if (params?.limit) searchParams.append("_limit", params.limit.toString())
        if (params?.sort) searchParams.append("_sort", params.sort)
        if (params?.order) searchParams.append("_order", params.order)

        const url = `/winners${searchParams.toString() ? `?${searchParams}` : ""}`
        const response = await fetch(`${BASE_URL}${url}`)

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`)
        }

        const winners = await response.json()
        const totalCount = getTotalCount(response)

        return { winners, totalCount }
    },

    getWinner: async (id: number): Promise<Winner> => {
        return apiRequest(`/winners/${id}`)
    },

    createWinner: async (winnerData: CreateWinnerRequest): Promise<Winner> => {
        return apiRequest("/winners", {
            method: "POST",
            body: JSON.stringify(winnerData),
        })
    },

    updateWinner: async (id: number, winnerData: UpdateWinnerRequest): Promise<Winner> => {
        return apiRequest(`/winners/${id}`, {
            method: "PUT",
            body: JSON.stringify(winnerData),
        })
    },

    deleteWinner: async (id: number): Promise<void> => {
        await apiRequest(`/winners/${id}`, {
            method: "DELETE",
        })
    },
}

export const generateRandomCar = (): CreateCarRequest => {
    const brands = [
        "Tesla",
        "BMW",
        "Mercedes",
        "Audi",
        "Ferrari",
        "Lamborghini",
        "Porsche",
        "McLaren",
        "Bugatti",
        "Koenigsegg",
    ]

    const models = ["Model S", "X5", "C-Class", "A4", "488 GTB", "Huracan", "911", "720S", "Chiron", "Regera"]

    const getRandomColor = (): string => {
        const colors = [
            "#FF6B6B",
            "#4ECDC4",
            "#45B7D1",
            "#96CEB4",
            "#FFEAA7",
            "#DDA0DD",
            "#98D8C8",
            "#F7DC6F",
            "#BB8FCE",
            "#85C1E9",
        ]
        return colors[Math.floor(Math.random() * colors.length)]
    }

    const randomBrand = brands[Math.floor(Math.random() * brands.length)]
    const randomModel = models[Math.floor(Math.random() * models.length)]

    return {
        name: `${randomBrand} ${randomModel}`,
        color: getRandomColor(),
    }
}

export const generateRandomCars = (count: number): CreateCarRequest[] => {
    return Array.from({ length: count }, () => generateRandomCar())
}
