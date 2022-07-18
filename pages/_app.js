import {StoreContext} from 'storeon/react';
import '../styles/globals.scss';
import 'normalize.css';
import { useStore } from '../store/store';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps);

  return (
    <StoreContext.Provider value={store}>
      <Component {...pageProps} />
    </StoreContext.Provider>
  )
}

export default MyApp
