import { useEffect } from 'react';

import type { PropsFromRedux } from '../components/Garage/GarageContainer';

export function useGarageFetch(props: PropsFromRedux): void {
  useEffect(() => {
    props.fetchData(props.currentPage);
  }, [props.fetchData, props.currentPage]);
}
