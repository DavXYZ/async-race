import type { Car } from '../../types';

export interface WinnerModalProps {
  winner: Car;
  onClose: () => void;
}

export interface WinnerModalContentProps {
  winner: Car;
}

export interface WinnerModalHF {
  onClose: () => void;
}
