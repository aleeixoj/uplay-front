import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import ReactModal from 'react-modal';
import Swal from 'sweetalert2';

import { RoundedButton } from '../../../Components/Header/styles';
import { api } from '../../../service/api';
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

const Reset: NextPage = () => {
  const { handleSubmit, register } = useForm();
  const [eye, setEye] = useState(true);
  const [typePass, setTypePass] = useState('password');

  const [, token] = Router.asPath.split('=');

  const handleResetPass: SubmitHandler<IInputProps> = async (data: any) => {
    const response = await api.post('/password/reset', data, {
      params: {
        token,
      },
    });

    if (response.status === 200) {
      Router.push('/login');
    }
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
            handleResetPass(data);
          })}
        >
          <StyledInput
            type={typePass}
            label="Nova Senha"
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
          <StyledButton type="submit"> Enviar </StyledButton>
        </StyledForm>
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

export default Reset;
