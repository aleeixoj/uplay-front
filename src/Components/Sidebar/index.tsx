/* eslint-disable no-use-before-define */

import { useContext } from 'react';
import { FiLogOut } from 'react-icons/fi';


import { ThemeContext } from 'styled-components';


import {
  Container,
  Header,
  UserData,
  Separator,
  Navbar,
  // Modal
} from './styles';
import { AuthContext } from '../../contexts/AuthContext';
import Link from 'next/link';
import { RoundedButton } from '../Header/styles';

interface IProps {
  name: string;
  signOut(): void;
}

const Sidebar = ({ name = 'Usuário', signOut, ...rest }: IProps) => {

  const { user } = useContext(AuthContext);
  // const [version, setVersion] = useState('')

  // useEffect(() => {
  //   async function getVersion() {
  //     const { data } = await axios.get(
  //       'https://api.github.com/repos/aleeixoj/Portal-Acessos-Server/releases/latest'
  //     )
  //     setVersion(data.name)
  //   }

  //   getVersion()
  // }, [])

  return (
    <>
      <Container {...rest}>
        <Header>
          <UserData>
            <Link href="/profile">
              <p>
                bem vindo, <strong>{user?.name}</strong>
              </p>
            </Link>

          </UserData>

          <RoundedButton type="button" onClick={signOut}>
            <FiLogOut />
          </RoundedButton>
        </Header>

        <Separator />

        <Navbar>
          <ul>
            <li>
              <Link href="/">Inicio</Link>
            </li>

          </ul>
        </Navbar>

        <span className="current-version">Versão: {/* {version} */}</span>
      </Container>
    </>
  );
};

export default Sidebar;