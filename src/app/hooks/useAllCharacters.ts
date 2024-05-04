import { useQuery } from '@tanstack/react-query';

import { getAllCharacters } from '../services/apiService';
import { Characters } from '../types/characters';

export const useAllCharacters = (
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initialData: Characters[]
) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getAllCharacters', url],
    queryFn: () => getAllCharacters(url),
    // we can also avoid the duplicate initial client call by providing the initial data to useQuery
    // initialData:initialData
  });

  return {
    characterFetchedData: data ? data.result : [],
    paginationLinks: data ? data.links : [],
    characterDataLoading: isLoading,
    characterDataIsError: isError,
    characterDataError: error,
  };
};
