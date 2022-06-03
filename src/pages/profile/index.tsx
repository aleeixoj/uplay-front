import { GetServerSideProps } from 'next/types';
import { parseCookies } from 'nookies';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaSignOutAlt } from 'react-icons/fa';
import { FiMapPin, FiLock, FiShoppingBag } from 'react-icons/fi';
import { IoPerson } from 'react-icons/io5';
import ReactModal from 'react-modal';
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify';

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
  StyledButton,
} from './styles';

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

export default function Profile() {
  const { user, signOut, handleUpdateAvatar } = useContext(AuthContext);
  const [icon, setIcon] = useState('none');
  const { handleSubmit, register } = useForm();

  const [updatingAddress, setUpdatingAdress] = useState(false);
  const [userDataModal, setUserDataModal] = useState(false);
  const [userAddressModal, setUserAddressModal] = useState(false);
  const [userSecurityModal, setUserSecurityModal] = useState(false);

  async function handleLogout() {
    await signOut();
  }

  const handleEditUserData = async (data: any) => {
    try {
      setUpdatingAdress(true);

      if (data.city) {
        await api.put('/users/update', { address: [data] });
      }
    } finally {
      setUpdatingAdress(false);
      setUserAddressModal(false);
      toast.success('Endereço Atualizado!', {
        position: 'top-right',
        pauseOnHover: true,
        theme: 'colored',
      });
    }
  };

  const handleSubmitAvatar = async (file: any) => {
    const [inputOn, setInputOn] = useState('none')
    if (!file) return;
    const formData = new FormData();
    formData.append('avatar', file);

    const { data } = await api.patch('users/avatar', formData);
    if (data.avatar_url) {
      handleUpdateAvatar(data.avatar_url);
    }
  };

  return (
    <Container>
      <div className="avatar">
        <Avatar>
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

        <div className="changeAvatar">
          <ArchInput
            name="input"
            register={register}
            onChange={handleSubmitAvatar}
            style={{ display: `${inputOn}` }}
          />
        </div>
      </div>

      <h4>{user?.name}</h4>
      <Box>
        <StyledProfileCard
          label="Meus dados"
          onClick={() => setUserDataModal(true)}
        >
          <IoPerson />
        </StyledProfileCard>
        <StyledProfileCard
          label="Segurança"
          onClick={() => setUserSecurityModal(true)}
        >
          <FiLock />
        </StyledProfileCard>
        <StyledProfileCard
          label="Meus endereços"
          onClick={() => setUserAddressModal(true)}
        >
          <FiMapPin />
        </StyledProfileCard>
        <StyledProfileCard label="Compras">
          <FiShoppingBag />
        </StyledProfileCard>
        <StyledProfileCard label="Sair" onClick={() => handleLogout()}>
          <FaSignOutAlt />
        </StyledProfileCard>
      </Box>

      <ReactModal style={customStyle} isOpen={userAddressModal}>
        <CloseButton onClick={() => setUserAddressModal(false)}>
          <AiOutlineCloseCircle />
        </CloseButton>
        <UserData>
          <div className="infos">
            <form
              onSubmit={handleSubmit((data: any) => {
                handleEditUserData(data);
              })}
            >
              <StyledInput
                label="Rua"
                type="text"
                register={register}
                name="street"
                defaultValue={user?.address && user?.address[0].street}
                valueDefault={user?.address && user?.address[0].street}
              ></StyledInput>
              <StyledInput
                label="Cidade"
                type="text"
                register={register}
                name="city"
                defaultValue={user?.address && user?.address[0].city}
                valueDefault={user?.address && user?.address[0].city}
              ></StyledInput>
              <StyledInput
                label="Número"
                type="text"
                register={register}
                name="number"
                defaultValue={user?.address && user?.address[0].number}
                valueDefault={user?.address && user?.address[0].number}
              ></StyledInput>
              <StyledInput
                label="Bairro"
                type="text"
                register={register}
                name="district"
                defaultValue={user?.address && user?.address[0].district}
                valueDefault={user?.address && user?.address[0].district}
              ></StyledInput>
              <StyledInput
                label="Estado"
                type="text"
                register={register}
                name="state"
                defaultValue={user?.address && user?.address[0].state}
                valueDefault={user?.address && user?.address[0].state}
              ></StyledInput>
              <StyledButton type="submit">
                {updatingAddress ? (
                  <ClipLoader color="#FFF" />
                ) : (
                  'Atualizar dados'
                )}
              </StyledButton>
            </form>
          </div>
        </UserData>
      </ReactModal>

      <ReactModal style={customStyle} isOpen={userDataModal}>
        <CloseButton onClick={() => setUserDataModal(false)}>
          <AiOutlineCloseCircle />
        </CloseButton>
        <UserData>
          <div className="infos">
            <form
              onSubmit={handleSubmit((data: any) => {
                handleEditUserData(data);
              })}
            >
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
                name="phone"
                defaultValue={user?.phone}
                valueDefault={user?.phone}
              ></StyledInput>

              <StyledButton type="submit">Atualizar dados</StyledButton>
            </form>
          </div>
        </UserData>
      </ReactModal>

      <ReactModal style={customStyle} isOpen={userSecurityModal}>
        <CloseButton onClick={() => setUserSecurityModal(false)}>
          <AiOutlineCloseCircle />
        </CloseButton>
        <UserData>Ainda em desenvolvimento</UserData>
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
        permanent: false
      },
    };
  }
  return {
    props: {}
  };
};
