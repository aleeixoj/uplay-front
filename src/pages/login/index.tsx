import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { RoundedButton } from '../../Components/Header/styles';
import { AuthContext } from '../../contexts/AuthContext';
import {
  Container,
  Logo,
  Separator,
  StyledInput,
  StyledButton,
  StyledForm,
  Box,
  Top,
} from './styles';

interface IInputProps {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const [eye, setEye] = useState(true);
  const [typePass, setTypePass] = useState('password');
  const { handleSubmit, register } = useForm();
  const { signIn } = useContext(AuthContext);

  const handleSignIn: SubmitHandler<IInputProps> = async (data: any) => {
    await signIn(data);
  };

  const handleEye = () => {
    if (eye === true) {
      setEye(false);
      setTypePass('text');
    } else {
      setEye(true);
      setTypePass('password');
    }
  };

  return (
    <Container>
      <Logo>
        <Link href="/">
          <a>
            <Image src="/app.svg" width={320} height={320} />
          </a>
        </Link>
      </Logo>

      <Separator />

      <Top>
        {/* <Logo>
          <Link href="/">
            <a>
              <Image src="/app.svg" width={100} height={100} />
            </a>
          </Link>
        </Logo> */}

        <StyledForm
          onSubmit={handleSubmit((data: any) => {
            handleSignIn(data);
          })}
        >
          <StyledInput
            type="email"
            label="E-mail"
            register={register}
            name="email"
            isRequired={true}
          ></StyledInput>
          <StyledInput
            type={typePass}
            label="Senha"
            register={register}
            name="password"
            isRequired={true}
          >
            <RoundedButton
              style={{ background: 'none' }}
              type="button"
              onClick={handleEye}
            >
              {eye ? <FiEye /> : <FiEyeOff />}
            </RoundedButton>
          </StyledInput>
          <Link href="/">
            <a>Esqueci a senha</a>
          </Link>
          <StyledButton type="submit"> Enviar </StyledButton>
        </StyledForm>
        <span className="notAccount">
          Vocẽ ainda não possui uma conta?
          <Link href="/register">
            <a>
              <strong> Registre-se agora</strong>
            </a>
          </Link>
        </span>
      </Top>

      {/* <Box>
        <span>Logar com</span>

        <Container>1</Container>
        <Container>2</Container>
        <Container>3</Container>

        <span>
          Vocẽ ainda não possui uma conta?
          <Link href="/register">
            <a>
              <strong> Registre-se agora</strong>
            </a>
          </Link>
        </span>
      </Box> */}
    </Container>
  );
};

export default Login;
