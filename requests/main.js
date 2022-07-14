import { request } from '../lib/datocms';

const HOMEPAGE_QUERY = `query HomepageQuery {
    homepage {
      title
      id
    }
    allCryptoEntries {
      cryptos {
        cryptoHint
        id
        cryptoAnswer
        createdAt
        colouredCell
      }
      title
      keyPhrase
      id
      slug
    }
}`;

export const getHomepageData = async () => {
    const data = await request({
        query: HOMEPAGE_QUERY
    });

    return data;
}
  