import { request } from '../lib/datocms';

const HOMEPAGE_QUERY = `query HomepageQuery {
    homepage {
      title
      id
    }
    allCryptoEntries {
      title
      keyPhrase
      id
      slug
      date
    }
}`;

export const getHomepageData = async () => {
    const data = await request({
        query: HOMEPAGE_QUERY
    });

    return data;
}
  