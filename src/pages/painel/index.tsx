import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

import { Dashboard } from '../../Components/Dashboard';

export default function Painel() {
  return (
    <Dashboard title="Painel adm" description="">
      <h1>Hello world</h1>
    </Dashboard>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'uplay.token': token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
