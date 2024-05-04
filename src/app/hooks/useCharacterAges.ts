import { useQuery } from '@tanstack/react-query';

import { Characters } from '../types/characters';
import { calculateCharacterAge } from '../utils/helper';

export const useCharacterAges = (characters: Characters[]) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getCharactersAge'],
    queryFn: async () => {
      // please note that the age API is requiring payment for further age info
      // as i have exhausted the daily limit
      // this would be the approach to fetch ages for  the character data

      const charactersWithAges = await calculateCharacterAge(characters);
      return charactersWithAges;
    },
  });

  return {
    charactersWithAgesData: data,
    charactersWithAgesDataLoading: isLoading,
    charactersWithAgesDataIsError: isError,
    charactersWithAgesDataError: error,
  };
};
