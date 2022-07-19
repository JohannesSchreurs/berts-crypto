import { StoreContext } from 'storeon/react';
import '../styles/globals.scss';
import 'normalize.css';
import { store } from '../store/store';

function App({ Component, pageProps }) {
  return (
    <StoreContext.Provider value={store}>
      <Component {...pageProps} />
    </StoreContext.Provider>
  )
}

export default App
