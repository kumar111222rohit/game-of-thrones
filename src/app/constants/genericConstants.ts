export const GOT_BASE_URL = 'https://anapioficeandfire.com/api';

export const INITIAL_GOT_BASE_URL = `${GOT_BASE_URL}/characters?page=1&pageSize=10`;

export const AGE_GOT_BASE_URL = 'https://api.agify.io';

export const API_KEY = 'd0f7417c840dbaaeded0ca5af6d23f59';
// not a good idea to have api key here though,
// we can use proxy servers or AWS Secrets Manager for API key resolutions
export const VERSION_1 = ''; // later we can add version 1 or version 2

export const PAGE_SIZE = 10; // load only 10 character data each time

export const DELAY = 300;
