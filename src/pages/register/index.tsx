/* eslint-disable no-unused-expressions */
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Container,
  Logo,
  StyledButton,
  StyledForm,
  StyledInput,
  Top,
} from './styles';

interface IInputProps {
  name: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  birthdate: string;

  addressName?: string;
  cep?: string;
  street?: string;
  number?: string;
  city?: string;
  district?: string;
  state?: string;
  province?: string;
}

const Register: NextPage = () => {
  const { handleSubmit, register } = useForm();
  const [showAddress, setShowAddress] = useState(false);
  const onSubmit: SubmitHandler<IInputProps> = (data: any) => {
    console.log(data);
  };

  const handleAddress = () => {
    showAddress === true ? setShowAddress(false) : setShowAddress(true);
  };

  return (
    <Container>
      <Top>
        <Logo>
          <Link href="/">
            <a>
              <Image src="/app.svg" width={100} height={100} />
            </a>
          </Link>
        </Logo>

        <StyledForm
          onSubmit={handleSubmit((data: any) => {
            onSubmit(data);
          })}
        >
          <StyledInput
            type="text"
            label="Nome"
            register={register}
            name="name"
            isRequired={true}
          ></StyledInput>

          <StyledInput
            type="text"
            label="Sobrenome"
            register={register}
            name="lastname"
            isRequired={true}
          ></StyledInput>

          <StyledInput
            type="text"
            label="Telefone"
            register={register}
            name="phone"
            isRequired={true}
          ></StyledInput>

          <StyledInput
            type="email"
            label="E-mail"
            register={register}
            name="email"
            isRequired={true}
          ></StyledInput>

          <StyledInput
            type="text"
            label="Data de nascimento"
            register={register}
            name="birthdate"
            isRequired={true}
          ></StyledInput>

          <StyledInput
            type="password"
            label="Senha"
            register={register}
            name="password"
            isRequired={true}
          ></StyledInput>

          {showAddress !== true && (
            <span onClick={() => handleAddress()}>+ Adicionar endereço</span>
          )}

          {showAddress === true && (
            <>
              <StyledInput
                type="text"
                label="Apelido endereço"
                register={register}
                name="addressName"
                isRequired={true}
              ></StyledInput>

              <StyledInput
                type="text"
                label="Cep"
                register={register}
                name="cep"
                isRequired={true}
              ></StyledInput>

              <StyledInput
                type="text"
                label="Rua"
                register={register}
                name="street"
                isRequired={true}
              ></StyledInput>

              <StyledInput
                type="text"
                label="Número"
                register={register}
                name="number"
                isRequired={true}
              ></StyledInput>

              <StyledInput
                type="text"
                label="Bairro"
                register={register}
                name="district"
                isRequired={true}
              ></StyledInput>

              <StyledInput
                type="text"
                label="Cidade"
                register={register}
                name="city"
                isRequired={true}
              ></StyledInput>

              <StyledInput
                type="text"
                label="Estado"
                register={register}
                name="state"
                isRequired={true}
              ></StyledInput>

              <StyledInput
                type="text"
                label="País"
                register={register}
                name="province"
                isRequired={true}
              ></StyledInput>

              <span onClick={() => handleAddress()}>- Remover endereço</span>
            </>
          )}

          <StyledButton type="submit"> Enviar </StyledButton>
        </StyledForm>
      </Top>

      <span>
        Vocẽ já possui uma conta?
        <Link href="/login">
          <a>
            <strong> Faça o login</strong>
          </a>
        </Link>
      </span>
    </Container>
  );
};

export default Register;
