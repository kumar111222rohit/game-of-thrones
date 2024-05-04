import { getCharactersAge } from '../services/apiService';
import { Characters } from '../types/characters';

export async function calculateCharacterAge(characters: Characters[]) {
  //  create the batch query for external age API
  const nameQuery = characters
    .map(
      (character: Pick<Characters, 'name'>) =>
        `name[]=${encodeURIComponent(character.name)}`
    )
    .join('&');
  const ages = await getCharactersAge(nameQuery);

  return ages;
}

export const extractLinks = (linkHeader: string) => {
  let links = {};
  if (linkHeader) {
    links = linkHeader.split(',').reduce((acc, link) => {
      const match = link.match(/<([^>]+)>;\s*rel="([^"]+)"/i);
      if (match) {
        acc[match[2]] = match[1];
      }
      return acc;
    }, {});
  }
  return links;
};
