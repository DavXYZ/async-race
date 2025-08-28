const DELTA_CONSTANTS = 2;

export const createPageRange = (
  currentPage: number,
  totalPages: number,
  delta = DELTA_CONSTANTS
): (number | '...')[] => {
  const range: number[] = [];
  const rangeWithDots: (number | '...')[] = [];

  for (
    let i = Math.max(DELTA_CONSTANTS, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    range.push(i);
  }

  if (currentPage - delta > DELTA_CONSTANTS) {
    rangeWithDots.push(1, '...');
  } else {
    rangeWithDots.push(1);
  }

  rangeWithDots.push(...range);

  if (currentPage + delta < totalPages - 1) {
    rangeWithDots.push('...', totalPages);
  } else {
    rangeWithDots.push(totalPages);
  }

  return rangeWithDots;
};
