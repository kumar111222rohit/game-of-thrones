import { AGE_GOT_BASE_URL, API_KEY } from '../constants/genericConstants';
import APIClient from './makeAPICall';

const getAllCharacters = async (url: string) => {
  return APIClient.get(url);
};

const getCharactersAge = async (query: string) => {
  return APIClient.get(`${AGE_GOT_BASE_URL}?${query}&apikey=${API_KEY}`);
};

export { getAllCharacters, getCharactersAge };
