import React from 'react';

import { GOT_BASE_URL } from '@/app/constants/genericConstants';
import { API_ROUTES } from '@/app/constants/apiRoutes';
import { CharactersDashboard } from '@/app/module/CharactersDashboard/components/CharactersDashBoard';
import { Characters } from '@/app/types/characters';

interface Props {
  characters: Characters[];
}
const CharactersOverview: React.FC<Props> = ({ characters }) => {
  return <CharactersDashboard characterData={characters} />;
};

export async function getServerSideProps() {
  try {
    const url = `${GOT_BASE_URL}${API_ROUTES.ALL_CHARACTERS}`;
    const res = await fetch(url);
    const characters = await res.json();
    return {
      props: {
        characters,
      },
    };
  } catch (e) {
    console.log(e);
    // also we can send to logger like sentry or kibana
  }
}

export default CharactersOverview;
