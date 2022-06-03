import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import { api } from '../../../service/api';
import {
  Container,
  Logo,
  Separator,
  StyledInput,
  StyledButton,
  StyledForm,
  Top
} from './styles';

interface IInputProps {
  email: string;
  password: string;
}

const Forgot: NextPage = () => {
  const { handleSubmit, register } = useForm();

  const handleSignIn: SubmitHandler<IInputProps> = async (data: any) => {
    const response = await api.post('/password/forgot', data);

    if (response.status === 200) {
      const alert = await Swal.fire({
        title: 'Recuperar senha',
        text: 'Em breve você receberá um link por e-mail, para recuperar sua senha',
      });

      if (alert) {
        Router.push('/login');
      }
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

export default Forgot;
