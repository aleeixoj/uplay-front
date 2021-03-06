/* eslint-disable no-plusplus */
import Image from 'next/image';
import { useContext, useState } from 'react';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';

import { getStringPrice } from '../../common/getStringPrice';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../service/api';
import { Container, RoundedButton } from './styles';

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  warranty: string;
  color: string;
  reference: string;
  code: string;
  stock: string;
  brand: string;
  categoryId: string;
};

type ProductProps = {
  product: Product;
  qtn: number;
};

export default function CartCard({ product, qtn }: ProductProps) {
  const { fillUserData } = useContext(AuthContext);
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

  const handleRemoveCart = async (id: string) => {
    await api.put('/product/removeToCart', {
      productId: id,
    });
    await fillUserData();
  };

  const [newQtn, setNewQtn] = useState(qtn);

  const handleAddCart = async (
    _newQtn: number,
    productId: string,
    productStock: number,
    price: number
  ) => {
    if (_newQtn < productStock) {
      // eslint-disable-next-line no-param-reassign
      _newQtn++;
      setNewQtn(_newQtn);
      await api.post('/product/addToCart', {
        productId,
        qtn: _newQtn,
        price,
      });
      fillUserData();
    }
  };
  const handleRmCart = async (
    _newQtn: number,
    productId: string,
    price: number
  ) => {
    // eslint-disable-next-line no-param-reassign
    _newQtn--;
    if (_newQtn > 0) {
      await api.post('/product/addToCart', {
        productId,
        qtn: _newQtn,
        price,
      });
      setNewQtn(_newQtn);
      fillUserData();
    } else {
      await handleRemoveCart(productId);
    }
  };

  return (
    <Container>
      <div className="image">
        <Image src={'/'} width="100%" height="100%" objectFit="cover" />
      </div>
      <div className="info">
        <div className="left">
          <span className="productName">{product.name}</span>
          <span className="productColor">cor: {product.color}</span>
          <span className="frete">Frete gr??tis</span>
          <div className="productQtn">
            <div className="btn">
              <RoundedButton
                onClick={() =>
                  handleAddCart(
                    newQtn,
                    product.id,
                    Number(product.stock),
                    product.price
                  )
                }
              >
                <FiPlus />
              </RoundedButton>
            </div>
            {newQtn}
            <div className="btn">
              <RoundedButton
                onClick={() => handleRmCart(newQtn, product.id, product.price)}
              >
                <FiMinus />
              </RoundedButton>
            </div>
          </div>
        </div>
        <div className="rigth">
          <span className="price">R$ {getStringPrice(product.price)}</span>
        </div>
      </div>
      <div className="removeCart">
        <RoundedButton onClick={() => handleRemoveCart(product.id)}>
          <FiTrash2 />
        </RoundedButton>
      </div>
    </Container>
  );
}
