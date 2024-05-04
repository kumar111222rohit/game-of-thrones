import { VERSION_1 } from '../constants/genericConstants';
import { RequestMethod, RequestOptions } from '../types/apiTypes';
import { extractLinks } from '../utils/helper';
import { toast } from 'react-toastify';

async function request(
  url: string,
  method: RequestMethod = 'GET'
): Promise<any> {
  const apiHostV1 = url + `${VERSION_1}`;

  const options: RequestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(apiHostV1, options);

    if (response.status === 404) {
      toast.warning('No character data found', { autoClose: 2000 });
    }

    const result = await response.json();
    toast.success('Character data fetched from server', { autoClose: 2000 });

    const linkHeader = response.headers.get('link');

    // Parse Link Header to extract URLs
    let links = {};
    if (linkHeader) {
      links = extractLinks(linkHeader);
    }

    return { result, links };
  } catch (e) {
    toast.error(`Unable to load character data because: ${e}`);
  }
}

const get = (url: string): Promise<any> => {
  return request(url, 'GET');
};

export default {
  get,
};
