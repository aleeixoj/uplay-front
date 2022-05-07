import { GetServerSideProps } from 'next/types';
import { parseCookies } from 'nookies';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaSignOutAlt } from 'react-icons/fa';
import { FiMapPin, FiLock, FiShoppingBag } from 'react-icons/fi';
import { IoPerson } from 'react-icons/io5';
import ReactModal from 'react-modal';

import { Button } from '../../Components/Button';
import ArchInput from '../../Components/InputFile';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../service/api';
import {
  Container,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Box,
  StyledProfileCard,
  StyledModal,
  CloseButton,
  UserData,
  StyledInput,
} from './styles';

export default function Profile() {
  const { user, signOut, handleUpdateAvatar } = useContext(AuthContext);
  const [icon, setIcon] = useState('none');
  const { handleSubmit, register } = useForm();

  const [userDataModal, setUserDataModal] = useState(false);

  const customStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: 'min(90%, 25rem)',
      height: '25rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '1rem',
      border: '1px solid #FAFAFA',
      background: '#FAFAFA',
      boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.5)',
      position: 'relative',
    },
    overlay: {
      zIndex: '999',
      background: 'rgba(0,0,0,0.2)',
    },
  };

  async function handleLogout() {
    await signOut();
  }

  const handleSubmitAvatar = async (file: any) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('avatar', file);

    const { data } = await api.patch('users/avatar', formData);
    if (data['avatar_url']) {
      handleUpdateAvatar(data.avatar_url);
    }

  }

  return (
    <Container>
      <div className="avatar">
        <Avatar
          onMouseEnter={() => setIcon('block')}
          onMouseLeave={() => setIcon('none')}
        >
          {/* <div
            className="icon"
            style={{
              display: icon,
            }}
          >
            <div className="cam">
              <FiCamera />
            </div>
          </div> */}
          <AvatarImage src={user?.avatar_url} alt={user?.name} />
          <AvatarFallback delayMs={600}>
            {user?.name
              .match(/(\b\S)?/g)
              .join('')
              .match(/(^\S|\S$)?/g)
              .join('')
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      <ArchInput name="input" register={register} onChange={handleSubmitAvatar} />


      <h4>{user?.name}</h4>
      <Box>
        <StyledProfileCard
          label="Meus dados"
          onClick={() => setUserDataModal(true)}
        >
          <IoPerson />
        </StyledProfileCard>
        <StyledProfileCard label="Segurança">
          <FiLock />
        </StyledProfileCard>
        <StyledProfileCard label="Meus endereços">
          <FiMapPin />
        </StyledProfileCard>
        <StyledProfileCard label="Compras">
          <FiShoppingBag />
        </StyledProfileCard>
        <StyledProfileCard label="Sair" onClick={() => handleLogout()}>
          <FaSignOutAlt />
        </StyledProfileCard>
      </Box>

      <ReactModal style={customStyle} isOpen={userDataModal}>
        <CloseButton onClick={() => setUserDataModal(false)}>
          <AiOutlineCloseCircle />
        </CloseButton>
        <UserData>
          <div className="infos">
            <form>
              <StyledInput
                label="Nome"
                type="text"
                register={register}
                name="name"
                defaultValue={user?.name}
                valueDefault={user?.name}
              ></StyledInput>
              <StyledInput
                label="E-mail"
                type="text"
                register={register}
                name="email"
                defaultValue={user?.email}
                valueDefault={user?.email}
              ></StyledInput>
              <StyledInput
                label="Telefone"
                type="text"
                register={register}
                pattern={
                  /(?:^([0]?[1-9]{2})|^[0]?[1-9]{2}[.-s]?)[9]?[1-9]d{3}[.-s]?d{4}$/
                }
                name="phone"
                defaultValue={user?.phone}
                valueDefault={user?.phone}
              ></StyledInput>
            </form>
          </div>
        </UserData>
      </ReactModal>
    </Container>
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
