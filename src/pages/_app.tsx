/* eslint-disable no-nested-ternary */
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';

import { Header } from '../Components/Header';
import AuthProvider from '../contexts/AuthContext';
import { GlobalStyle } from '../styles/GlobalStyle';
import light from '../styles/themes/light';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <ThemeProvider theme={light}>
        <AuthProvider>
          <GlobalStyle />
          {router.asPath !== '/login' && router.asPath !== '/register' && (
            <Header />
          )}

          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
