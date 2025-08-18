export const API_CONFIG = {
    BASE_URL: "http://127.0.0.1:3000",
    ENDPOINTS: {
        GARAGE: "/garage",
        ENGINE: "/engine",
        WINNERS: "/winners",
    },
    PAGINATION: {
        GARAGE_PAGE_SIZE: 7,
        WINNERS_PAGE_SIZE: 10,
    },
    RACE: {
        TRACK_WIDTH: 800,
        CAR_WIDTH: 60,
        ANIMATION_DURATION: 1000,
    },
} as const

export const CAR_BRANDS = [
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
    "Ford",
    "Chevrolet",
] as const

export const CAR_MODELS = [
    "Model S",
    "X5",
    "C-Class",
    "A4",
    "488 GTB",
    "Huracan",
    "911",
    "720S",
    "Chiron",
    "Regera",
    "Mustang",
    "Camaro",
] as const

export const DEFAULT_COLORS = [
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
    "#F39C12",
    "#E74C3C",
    "#9B59B6",
    "#3498DB",
    "#2ECC71",
] as const
