import _ from 'lodash';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useContext, useEffect, useState } from 'react';
import { FiCheck, FiCreditCard, FiX } from 'react-icons/fi';

import { GetStringPrice } from '../../common/getStringPrice';
import { Carousel } from '../../Components/Carousel';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../service/api';
import { Container, Success, Declined, StyledButton } from './styles';

type Order = {
  id: string;
  statusId: string;
  userId: string | null;
  productsIds: string[];
  orderNumber: string;
  trackingNumber: string;
  totalPrice: string;
  created_at: Date;
  updated_at: Date;
  paymentStatus: string;
  installments: string;
  installmentsValue: string;
};

type OrderProps = {
  order: Order[];
};

export default function Order({ order }: OrderProps) {
  const [products, setProducts] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await api.get('/product/all', {
        params: {
          limit: 6,
        },
      });
      setProducts(data);
    };
    getProducts();
  }, []);

  return (
    <>
      {order.map((_order) => (
        <Container key={_order.id}>
          {_order.paymentStatus === 'approved' ? (
            <Success>
              <div className="order">
                <h4>Pronto, seu pedido foi aprovado</h4>
                <h4>Número do pedido: {_order.orderNumber}</h4>

                <div className="rounded">
                  <FiCheck />
                </div>
              </div>

              <div className="address">
                <span>Chegará entre quinta e sexta-feira</span>
                <span>No Endereço {user?.address[0].street}</span>
              </div>

              <div className="payed">
                <div className="icon">
                  <FiCreditCard />
                </div>
                <div className="desc">
                  <span className="value">
                    Você pagou {_order.installments}x de R${' '}
                    {GetStringPrice.getStringPrice(
                      Number(_order.installmentsValue),
                    )}
                  </span>
                  <span className="total">
                    Total R${' '}
                    {GetStringPrice.getStringPrice(Number(_order.totalPrice))}
                  </span>
                </div>
              </div>

              <h4>Talvez você também goste</h4>
              {products.length > 0 && (
                <Carousel type="scroll" products={products} />
              )}
            </Success>
          ) : (
            <Declined>
              <div className="order">
                <h4>Houve uma falha com seu pagamento</h4>

                <div className="rounded">
                  <FiX />
                </div>
              </div>

              <div className="address">
                <span>
                  Verifique os dados e tente novamente, caso persista entre em
                  contato com a central de seu cartão
                </span>
              </div>

              <div className="payed">
                <div className="icon">
                  <FiCreditCard />
                </div>
                <div className="desc">
                  <span className="value">1x de R$ 224,98</span>
                  <span className="total">Total R$224,98</span>
                </div>
              </div>
              <StyledButton>Pagar com outra forma</StyledButton>

              <h4>Talvez você se interesse por</h4>
              {products.length > 0 && (
                <Carousel type="scroll" products={products} />
              )}
            </Declined>
          )}
        </Container>
      ))}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get('orders/all', {
    params: {
      _sort: 'created_at',
      _order: 'desc',
    },
  });

  const paths = data.map((orders: Order) => ({
    params: {
      slug: orders.id,
    },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const { data } = await api.get(`/orders/${slug}`);

  const order = data.map((_order: Order) => ({
    id: _order.id,
    statusId: _order.statusId,
    userId: _order.userId,
    productsIds: _order.productsIds,
    orderNumber: _order.orderNumber,
    trackingNumber: _order.trackingNumber,
    totalPrice: _order.totalPrice,
    created_at: _order.created_at,
    updated_at: _order.updated_at,
    paymentStatus: _order.paymentStatus,
    installments: _order.installments,
    installmentsValue: _order.installmentsValue,
  }));
  return {
    props: { order },
    revalidate: 60 * 60 * 24,
  };
};
