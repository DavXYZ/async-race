export interface Car {
  id: number;
  name: string;
  color: string;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface WinnerWithCar extends Winner {
  car: Car;
}

export interface EngineResponse {
  velocity: number;
  distance: number;
}

export interface DriveResponse {
  success: boolean;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface SortParams {
  sort?: 'id' | 'wins' | 'time';
  order?: 'ASC' | 'DESC';
}

export interface CreateCarRequest {
  name: string;
  color: string;
}

export interface UpdateCarRequest {
  name: string;
  color: string;
}

export interface CreateWinnerRequest {
  id: number;
  wins: number;
  time: number;
}

export interface UpdateWinnerRequest {
  wins: number;
  time: number;
}

export interface GetCarsResponse {
  cars: Car[];
  totalCount: number;
}

export interface GetWinnersResponse {
  winners: Winner[];
  totalCount: number;
}

export interface CarsState {
  cars: Car[];
  totalCount: number;
  currentPage: number;
  loading: boolean;
  error: string | null;
  selectedCar: Car | null;
}

export interface WinnersState {
  winners: WinnerWithCar[];
  totalCount: number;
  currentPage: number;
  sortBy: 'id' | 'wins' | 'time';
  sortOrder: 'ASC' | 'DESC';
  loading: boolean;
  error: string | null;
}

