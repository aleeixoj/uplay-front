/* eslint-disable no-nested-ternary */
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';

import { Header } from '../Components/Header';
import { GlobalStyle } from '../styles/GlobalStyle';
import light from '../styles/themes/light';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <ThemeProvider theme={light}>
        <GlobalStyle />
        {router.asPath !== '/login' && router.asPath !== '/register' && (
          <Header />
        )}

        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
