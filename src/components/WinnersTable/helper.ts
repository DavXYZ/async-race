const FRACTION_DIGITS = 2;

export const getSortIcon = (
  sortBy: 'id' | 'wins' | 'time',
  sortOrder: 'ASC' | 'DESC',
  column: 'id' | 'wins' | 'time'
): string => {
  if (sortBy !== column) return '↕️';
  return sortOrder === 'ASC' ? '↑' : '↓';
};

export const formatTime = (time: number): string => `${time.toFixed(FRACTION_DIGITS)}s`;
