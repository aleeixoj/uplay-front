import Image from 'next/image';
import { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';

import { StyledSelect } from '../../pages/product/styles';
import { Container, RoundedButton } from './styles';

export default function CartCard() {
  const customStyles = {
    option: (provided) => ({
      ...provided,
      fontWeight: 400,
      padding: 10,
    }),
    control: () => ({
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'auto',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
  };

  return (
    <Container>
      <div className="image">
        <Image src={'/'} width="100%" height="100%" objectFit="cover" />
      </div>
      <div className="info">
        <div className="left">
          <span className="productName">Headset Gamer</span>
          <span className="productColor">cor: Preto</span>
          <span className="frete">Frete grátis</span>
        </div>
        <div className="rigth">
          <span className="price">R$ 99,99</span>
        </div>
      </div>
      <RoundedButton>
        <FiTrash2 />
      </RoundedButton>
    </Container>
  );
}
