/* eslint-disable no-nested-ternary */
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import Modal from 'react-modal';
import { ThemeProvider } from 'styled-components';

import { Header } from '../Components/Header';
import AuthProvider from '../contexts/AuthContext';
import { GlobalStyle } from '../styles/GlobalStyle';
import light from '../styles/themes/light';

Modal.setAppElement('#__next');
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Script src="https://sdk.mercadopago.com/js/v2"></Script>
      <ThemeProvider theme={light}>
        <AuthProvider>
          <GlobalStyle />
          {router.asPath !== '/login'
            && router.asPath !== '/register'
            && router.asPath !== '/painel' && <Header />}

          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
