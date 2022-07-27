import { useEffect } from 'react';
import { useStoreon } from 'storeon/react';
import Head from 'next/head';

import { getCryptoEntryDataBySlug, getAllCryptoEntrySlugs } from '../../requests/crypto-entry';
import { createGridFromData } from '../../utils/transformData';
import constants from '../../store/constants';

import GridWrapper from '../../components/Modules/GridWrapper/GridWrapper';
import CryptoHeader from '../../components/Modules/CryptoHeader/CryptoHeader';
import CryptoHints from '../../components/Modules/CryptoHints/CryptoHints';

export default function Crypto({ crypto, gridData }) {
  const { title, date, cryptos } = crypto;
  const { dispatch } = useStoreon('grid');

  useEffect(() => {
    dispatch(constants.STORE.GRID.SET.DEFAULT, gridData);
  }, []);

  return (
    <>
      <Head>
        <title>{ `Bert's Crypto | ${title}` }</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CryptoHeader title={title} date={date} />
        
      <GridWrapper gridData={gridData} hints={cryptos} />

      <CryptoHints />
    </>
  )
}

export async function getStaticPaths() {
  const slugs = await getAllCryptoEntrySlugs();
  const paths = [];

  slugs.allCryptoEntries.map(entry => paths.push(`/cryptos/${entry.slug}`))

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const data = await getCryptoEntryDataBySlug(params.slug);
  const pageData = data?.cryptoEntry;

  const gridData = createGridFromData(data)

  return {
    props: { 
      crypto: pageData,
      gridData,
      slug: params.slug
    }
  }
}
