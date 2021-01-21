import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client';
import { HelmetProvider } from 'react-helmet-async';
import { client } from '../service/config';
import store from '../redux/store';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <HelmetProvider>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ApolloProvider>
    </HelmetProvider>
  )
}

export default MyApp
