import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

type VerifyProps = {
  getServerSideProps: (ctx) => Promise<any>;
};

export class VerifyAuth {
  getServerSideProps: GetServerSideProps = async (ctx) => {
    const { 'uplay.token': token } = parseCookies(ctx);

    if (!token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    return {
      props: {},
    };
  };
}
