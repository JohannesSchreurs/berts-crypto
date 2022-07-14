import { request } from '../lib/datocms';

const CRYPTO_ENTRY_QUERY = `query CrytpoEntryQueryBySlug($slug: String) {
    cryptoEntry(filter: {slug: {eq: $slug}}) {
        title
        slug
        keyPhrase
        id
        cryptos {
          cryptoHint
          cryptoAnswer
          createdAt
          colouredCell
          id
        }
      }
}`;

const CRYPTO_SLUGS = `query CryptoSlugs {
    allCryptoEntries {
      slug
    }
}`;

export const getCryptoEntryDataBySlug = async (slug) => {
    const data = await request({
        query: CRYPTO_ENTRY_QUERY,
        variables: { slug: slug }
    });

    return data;
}

export const getAllCryptoEntrySlugs = async () => {
    const data = await request({
        query: CRYPTO_SLUGS
    });

    return data;
}
  