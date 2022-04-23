/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */

import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiCreditCard, FiHeart, FiShare2, FiTruck } from 'react-icons/fi';

import { Carousel } from '../../Components/Carousel';
import { RoundedButton } from '../../Components/Header/styles';
import { api } from '../../service/api';
import { Separator } from '../login/styles';
import {
  Container,
  ProductImage,
  ProductInfo,
  StyledSelect,
  ProductCheckout,
  StyledButton,
  ProductDescription,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Box,
} from './styles';

export type Address = {
  street: string;
  city: string;
  state: string;
  province: string;
  number: string;
  complement: string;
  name?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  avatar: string;
  status: string;
  created_at: string;
  updated_at: string;
  profileId: string;
  address: Address[];
  ordersId: any[];
};

type Comment = {
  id: string;
  userId: string;
  created_at: string;
  updated_at: string;
  productId: string;
  comment: string;
  user: User;
};

type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  warranty: string;
  color: string;
  reference: string;
  code: string;
  stock: string;
  brand: string;
  categoryId: string;
  comments: Comment[];
};

type ProductsProps = {
  product: Product;
};

type Stock = {
  label: string;
  value: number;
  idx: number;
};

export default function Product({ product }: ProductsProps) {
  const [, numberPrice] = product.price.split(' ');
  const quota = (parseInt(numberPrice, 10) / 10).toFixed(2);

  const newStock: Array<Stock> = [];
  for (let index = 0; index < Number(product.stock); index++) {
    const lb = (index + 1).toString();
    const label = Number(lb) > 1 ? `${lb} unidades` : `${lb} unidade`;
    newStock.push({
      value: index + 1,
      label,
      idx: index,
    });
  }
  const [qnt, setQnt] = useState(newStock[0].value);

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

  const [dataProducts, setDataProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const response = await api.get(`/product/all`, {
        params: {
          limit: 6,
        },
      });
      setAllProducts(response.data);
    };
    const getProductsByCategory = async () => {
      const response = await api.get(
        `/product/by_category/${product.categoryId}`,
        {
          params: {
            limit: 6,
          },
        }
      );
      setDataProducts(response.data);
    };
    getAllProducts();
    getProductsByCategory();
  }, []);

  return (
    <Container>
      <ProductImage>
        <h3>Ola</h3>
      </ProductImage>
      <div className="div">
        <ProductInfo>
          <div className="texts">
            <div className="info">
              <span>{product.name}</span>
              <span>{product.price}</span>
              <span style={{ color: 'green' }}>Em até 10x de R$ {quota}</span>
            </div>

            <div className="track">
              <span className="payments">Ver os meios de pagamento</span>

              <span className="send">
                <FiTruck />
                Frete grátis para todo brasil
              </span>
            </div>

            <div className="stock">
              <h4>
                {Number(product.stock) === 1
                  ? 'Último dísponivel'
                  : Number(product.stock) > 1
                    ? 'Estoque dísponivel'
                    : 'Sem estoque'}
              </h4>
              <div className="form">
                <span>Quantidade: </span>

                <StyledSelect
                  styles={customStyles}
                  defaultValue={newStock[0]}
                  options={newStock}
                  onChange={({ value }) => setQnt(value)}
                />

                <span>
                  {Number(product.stock) > 1
                    ? `(${Number(product.stock)} disponiveis)`
                    : `(${Number(product.stock)} disponivel)`}
                </span>
              </div>
            </div>
          </div>
          <div className="icons">
            <RoundedButton>
              <FiShare2 />
            </RoundedButton>
            <RoundedButton>
              <FiHeart />
            </RoundedButton>
          </div>
        </ProductInfo>

        <ProductCheckout>
          <StyledButton
            type={'button'}
            onClick={() => console.log(qnt, product.id)}
          >
            Comprar agora
          </StyledButton>
          <StyledButton type={'button'}>Enviar para o carrinho</StyledButton>
        </ProductCheckout>
      </div>
      <div className="bottom">
        <div className="carousel">
          <span>Mais produtos que possam te interessar</span>
          <Carousel products={dataProducts} type="scroll" />
        </div>

        <ProductDescription>
          <div className="content">
            <div className="wrapper">
              <div className="box">
                <h4>Descrição do produto</h4>
                <span>{product.description}</span>
              </div>
              <div className="box">
                <h4>Garantia</h4>
                <span>Garantia de {product.warranty}, direto na loja!</span>
              </div>
            </div>
            <div className="wrapper">
              <div className="box">
                <h4>Meios de pagamento</h4>
                <div className="payment">
                  <FiCreditCard /> Pague em até 10x no cartão
                </div>
                <div className="icons">
                  <div className="icon">
                    <img src={'/master.png'} />
                  </div>
                  <div className="icon">
                    <img src={'/visa.svg'} />
                  </div>
                  <div className="icon">
                    <img src={'/elo.svg'} />
                  </div>
                  <div className="icon">
                    <img src={'/pix.png'} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content">
            <div className="comment">
              <h4>Opiniões sobre o produto</h4>
              {product.comments.length > 0 ? (
                product.comments.map((comment) => {
                  return (
                    <div key={comment.id} className="commentContent">
                      <div className="avatar">
                        <Avatar>
                          <AvatarImage
                            src={comment.user.avatar}
                            alt={comment.user.name}
                          />
                          <AvatarFallback delayMs={600}>
                            {comment?.user?.name
                              ?.match(/(\b\S)?/g)
                              ?.join('')
                              ?.match(/(^\S|\S$)?/g)
                              ?.join('')
                              ?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="commentInfo">
                        <h4>{comment.user?.name}</h4>
                        <span>{comment.comment}</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <span>Nenhum comentário até o momento</span>
              )}
            </div>

            <div className="moreProducts">
              <h5>Mais produtos que voce possa gostar</h5>
              <div className="all">
                {allProducts.map((_product: Product) => {
                  return (
                    <Link href={`/product/${_product.id}`} key={_product.id}>
                      <Box>
                        <div className="img">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_URL_API}/product/images/${_product.id}`}
                            width="100%"
                            height="100%"
                          />
                        </div>
                        <div className="texts">
                          <span>{_product.name}</span>
                          <span>{_product.price}</span>
                        </div>
                      </Box>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </ProductDescription>
      </div>
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('/product/all', {
    params: {
      _sort: 'created_at',
      _order: 'desc',
    },
  });

  const paths = data.map((product: any) => {
    return {
      params: {
        slug: product.id,
      },
    };
  });
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const { data } = await api.get(`/product/${slug}`);
  console.log('data >>', data);
  const product = {
    id: data.id,
    name: data.name,
    price: data.price,
    description: data.description,
    warranty: data.warranty,
    color: data.color,
    reference: data.reference,
    code: data.code,
    stock: data.stock,
    brand: data.brand,
    categoryId: data.categoryId,
    comments: data.comments,
  };

  return {
    props: { product },
    revalidate: 60 * 60 * 24,
  };
};
