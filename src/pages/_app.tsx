/* eslint-disable no-nested-ternary */
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import Modal from 'react-modal';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';

import { Header } from '../Components/Header';
import AuthProvider from '../contexts/AuthContext';
import { GlobalStyle } from '../styles/GlobalStyle';
import light from '../styles/themes/light';

import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#__next');
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const renderHeader = () => {
    const noHeaderRoutes = [
      '/login',
      '/register',
      '/painel',
      '/password/forgot',
      '/password/reset'
    ];
    const pathWithoutToken =
      router.asPath.indexOf('?') !== -1
        ? router.asPath.substr(0, router.asPath.indexOf('?'))
        : router.asPath;

    if (!noHeaderRoutes.includes(pathWithoutToken)) {
      return <Header />;
    }
    return null;
  };

  return (
    <>
      <Script src="https://sdk.mercadopago.com/js/v2"></Script>
      <ThemeProvider theme={light}>
        <AuthProvider>
          <GlobalStyle />
          <ToastContainer />
          {renderHeader()}
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
