import { connect, type ConnectedProps } from 'react-redux';
import { useEffect } from 'react';

import { API_CONFIG } from '../../api/constants';
import type { AppDispatch, RootState } from '../../redux/store';
import type { WinnerWithCar } from '../../types';
import { fetchWinners, setSorting, setCurrentPage } from '../../redux/slices/winnersSlice.ts';

import Winner from './Winner';

const mapState = (
  state: RootState
): {
  winners: WinnerWithCar[];
  totalCount: number;
  currentPage: number;
  sortBy: 'id' | 'wins' | 'time';
  sortOrder: 'ASC' | 'DESC';
  loading: boolean;
  error: string | null;
} => ({
  winners: state.winners.winners,
  totalCount: state.winners.totalCount,
  currentPage: state.winners.currentPage,
  sortBy: state.winners.sortBy,
  sortOrder: state.winners.sortOrder,
  loading: state.winners.loading,
  error: state.winners.error,
});

const mapDispatch = (
  dispatch: AppDispatch
): {
  fetchData: {
    (page: number, sortBy: 'id' | 'wins' | 'time', sortOrder: 'ASC' | 'DESC'): void;
  };
  setCurrentPage: {
    (page: number): void;
  };
  setSorting: {
    (payload: { sortBy: 'id' | 'wins' | 'time'; sortOrder: 'ASC' | 'DESC' }): void;
  };
} => ({
  fetchData: (page: number, sortBy: 'id' | 'wins' | 'time', sortOrder: 'ASC' | 'DESC'): void =>
    void dispatch(
      fetchWinners({
        page,
        limit: API_CONFIG.PAGINATION.WINNERS_PAGE_SIZE,
        sort: sortBy,
        order: sortOrder,
      })
    ),

  setCurrentPage: (page: number): void => {
    dispatch(setCurrentPage(page));
  },

  setSorting: (payload: { sortBy: 'id' | 'wins' | 'time'; sortOrder: 'ASC' | 'DESC' }): void => {
    dispatch(setSorting(payload));
  },
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const WinnerContainer: React.FC<PropsFromRedux> = ({
  winners,
  totalCount,
  currentPage,
  sortBy,
  sortOrder,
  loading,
  error,
  fetchData,
  setCurrentPage,
  setSorting,
}) => {
  const totalPages: number = Math.ceil(totalCount / API_CONFIG.PAGINATION.WINNERS_PAGE_SIZE);

  useEffect((): void => {
    fetchData(currentPage, sortBy, sortOrder);
  }, [fetchData, currentPage, sortBy, sortOrder]);
  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };
  const handleSort = (column: 'id' | 'wins' | 'time'): void => {
    const newOrder: 'ASC' | 'DESC' = sortBy === column && sortOrder === 'ASC' ? 'DESC' : 'ASC';
    setSorting({ sortBy: column, sortOrder: newOrder });
  };

  return (
    <Winner
      winners={winners}
      totalCount={totalCount}
      currentPage={currentPage}
      sortBy={sortBy}
      sortOrder={sortOrder}
      loading={loading}
      error={error}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      onSort={handleSort}
    />
  );
};

export default connector(WinnerContainer);
