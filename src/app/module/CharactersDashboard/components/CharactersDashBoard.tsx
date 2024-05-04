import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { Table } from '@/app/components/Table/Table';
import { RootLayout } from '@/app/components/Layout/RootLayout';
import { Characters } from '@/app/types/characters';
import { useAllCharacters } from '@/app/hooks/useAllCharacters';
import { useCharacterAges } from '@/app/hooks/useCharacterAges';
import LoadingTable from '@/app/components/Loading/Loading';

import './CharactersDashBoard.css';
import { INITIAL_GOT_BASE_URL } from '@/app/constants/genericConstants';

interface Props {
  characterData: Characters[];
}
export const CharactersDashboard: React.FC<Props> = ({ characterData }) => {
  const [pageURL, setPageURL] = useState<string>(INITIAL_GOT_BASE_URL);

  // initialise data from server side characterData
  const [data, setData] = useState(characterData);
  const [ageData, setAgeData] = useState([]);

  const { characterFetchedData, paginationLinks, characterDataLoading } =
    useAllCharacters(pageURL, characterData);
  const [isLoading, setIsLoading] = useState<boolean>(characterDataLoading);

  const { charactersWithAgesData } = useCharacterAges(characterData);

  useEffect(() => {
    // onclick of next or previous button set character data
    if (characterFetchedData && characterFetchedData.length > 0) {
      setIsLoading(true);
      setData(characterFetchedData);
      setAgeData(charactersWithAgesData);
      setIsLoading(false);
    }
  }, [characterFetchedData, paginationLinks]);

  const handleChangePage = (url: string) => {
    setPageURL(url);
  };
  if (isLoading) {
    return <LoadingTable />;
  }

  return (
    <>
      <RootLayout>
        <article className="dashboard-container">
          <Image
            src={'/static/assets/background-image-got.jpeg'}
            alt={'Game of thrones'}
            width={1000}
            height={1000}
            className="background-image"
            objectFit="cover"
          />
          <Table
            characterData={data}
            charactersWithAgesData={ageData}
            handleChangePage={handleChangePage}
            paginationLinks={paginationLinks}
          />
        </article>
      </RootLayout>
    </>
  );
};
