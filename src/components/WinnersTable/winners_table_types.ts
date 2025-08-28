import type { WinnerWithCar } from '../../types';

export interface WinnerRowProps {
  winner: WinnerWithCar;
}

export interface WinnersTableProps {
  winners: WinnerWithCar[];
  onSort: (column: 'id' | 'wins' | 'time') => void;
  sortBy: 'id' | 'wins' | 'time';
  sortOrder: 'ASC' | 'DESC';
}
