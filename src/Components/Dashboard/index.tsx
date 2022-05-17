
import { Grid, Main } from './styles';

import Header from '../DashHeader';
import Sidebar from '../Sidebar';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';


interface IProps {
  children: any;
  title: string;
  description: string;
}

export const Dashboard = ({ children, ...rest }: IProps) => {
  const { signOut, user } = useContext(AuthContext);

  return (
    <Grid>
      <Sidebar name={user?.name} signOut={signOut} />

      <Header title={rest.title} description={rest.description} />

      <Main>{children}</Main>
    </Grid>
  );
};



