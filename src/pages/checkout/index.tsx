import _ from 'lodash';
import { GetServerSideProps, GetStaticProps } from 'next';
import Router from 'next/router';
import { parseCookies } from 'nookies';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ReactModal from 'react-modal';

import { formatPrice } from '../../common/formatPrice';
import { getStringPrice } from '../../common/getStringPrice';
import { Button } from '../../Components/Button';
import { AddressSelect } from '../../Components/Address/AddressSelect';
import { AuthContext } from '../../contexts/AuthContext';
import { useMercadopago } from '../../hooks/useMercadopago';
import { api } from '../../service/api';
import {
  Box,
  CloseButton,
  Container,
  InputContent,
  StyledButtom,
  StyledForm,
  Grid
} from './styles';

const customStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: 'min(90%, 60rem)',
    height: '40rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '1rem',
    border: '1px solid #FAFAFA',
    background: '#FAFAFA',
    boxShadow: '0px 0px 10px 1px rgba(0,0,0,0.5)',
    position: 'relative'
  },
  overlay: {
    zIndex: '999',
    background: 'rgba(0,0,0,0.2)'
  },
};

const sty = {
  background: '#FAFAFA',
  fontSize: '0.875rem',
  top: '-0.5rem',
  left: '0.8rem',
  zIndex: 2
};

function ModalForm({ handleCloseModal }: any) {
  const { user } = useContext(AuthContext);
  const [saveDataValue, setSaveDataValue] = useState(true);
  const { mercadopago } = useMercadopago(
    'TEST-cb1365c9-25d3-4f1d-ae59-6340faca0e25'
  );
  const [labelStyle, setLabelStyle] = useState({});

  function handleSaveDataChecked() {
    setSaveDataValue(!saveDataValue);
  }

  function handleBlur(value: string) {
    if (value) {
      setLabelStyle(sty);
    } else {
      setLabelStyle({});
    }
  }

  const getTotal = (productsQtn = user?.cart.productsQtn): string => {
    const total = formatPrice(
      Number(
        productsQtn?.reduce(
          (sumTotal, product) => sumTotal + product.totalPrice,
          0
        ),
      ),
    );

    return total.substring(3).replace(',', '.');
  };

  function loadCardForm() {
    const cardForm = mercadopago?.cardForm({
      amount: getTotal(),
      autoMount: true,
      form: {
        id: 'form-checkout',
        cardholderName: {
          id: 'form-checkout__cardholderName'
        },
        cardNumber: {
          id: 'form-checkout__cardNumber'
        },
        cardExpirationMonth: {
          id: 'form-checkout__cardExpirationMonth'
        },
        cardExpirationYear: {
          id: 'form-checkout__cardExpirationYear'
        },
        securityCode: {
          id: 'form-checkout__securityCode'
        },
        installments: {
          id: 'form-checkout__installments',
          placeholder: 'Parcelas'
        },
        identificationType: {
          id: 'form-checkout__identificationType'
        },
        identificationNumber: {
          id: 'form-checkout__identificationNumber'
        },
        issuer: {
          id: 'form-checkout__issuer',
          placeholder: 'Banco emissor'
        },
      },
      callbacks: {
        onFormMounted: (error: Error) => {
          if (error) {
            return console.warn('Form Mounted handling error: ', error);
          }
          console.log('Form mounted');
          return '';
        },

        onSubmit: (event: Event) => {
          event.preventDefault();
          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType
          } = cardForm.getCardFormData();

          api
            .post('/payments/process_payment', {
              token,
              issuer_id,
              payment_method_id,
              transaction_amount: Number(amount),
              installments: Number(installments),
              description: 'Descrição do produto',
              saveDataValue,
              productsIds: user?.cart.productsIds,
              payer: {
                email,
                identification: {
                  type: identificationType,
                  number: identificationNumber
                },
              },
            })
            .then(({ data }) => {
              if (data.createPayment.response.status === 'approved') {
                handleCloseModal(true);
                Router.push(`order/${data.order.id}`);
              }
            });
        }
      },
    });
  }

  useEffect(() => {
    if (mercadopago) {
      setTimeout(() => {
        loadCardForm();
      }, 500);
    }
  }, [saveDataValue, mercadopago]);

  return (
    <>
      <CloseButton onClick={() => handleCloseModal(false)}>
        <AiOutlineCloseCircle />
      </CloseButton>

      <StyledForm id="form-checkout">
        <InputContent>
          <label
            style={labelStyle}
            className="label"
            htmlFor="form-checkout__cardholderName"
          >
            Número do cartão
          </label>
          <input
            type="text"
            name="cardNumber"
            id="form-checkout__cardNumber"
            onBlur={({ target }) => {
              handleBlur(target.value);
            }}
          />
        </InputContent>
        <div className="year">
          <InputContent>
            <label
              style={labelStyle}
              className="label"
              htmlFor="form-checkout__cardExpirationMonth"
            >
              Mês
            </label>

            <input
              id="form-checkout__cardExpirationMonth"
              name="cardExpirationMonth"
              type="text"
              maxLength={2}
              onBlur={({ target }) => {
                handleBlur(target.value);
              }}
            />
          </InputContent>
          /
          <InputContent>
            <label
              style={labelStyle}
              className="label"
              htmlFor="form-checkout__cardExpirationYear"
            >
              Ano
            </label>
            <input
              type="text"
              name="expirationDate"
              id="form-checkout__cardExpirationYear"
              maxLength={2}
              onBlur={({ target }) => {
                handleBlur(target.value);
              }}
            />
          </InputContent>
          <InputContent>
            <label
              style={labelStyle}
              className="label"
              htmlFor="form-checkout__securityCode"
            >
              CVV
            </label>
            <input
              type="text"
              name="securityCode"
              id="form-checkout__securityCode"
              onBlur={({ target }) => {
                handleBlur(target.value);
              }}
            />
          </InputContent>
        </div>
        <InputContent>
          <label
            style={labelStyle}
            htmlFor="form-checkout__cardholderName"
            className="label"
          >
            Titular do cartão
          </label>
          <input
            type="text"
            name="cardholderName"
            id="form-checkout__cardholderName"
            onBlur={({ target }) => {
              handleBlur(target.value);
            }}
          />
        </InputContent>

        <select
          name="issuer"
          id="form-checkout__issuer"
          style={{ display: 'none' }}
        ></select>
        <div className="selects">
          <select name="installments" id="form-checkout__installments"></select>
          <select
            name="identificationType"
            id="form-checkout__identificationType"
          ></select>
        </div>
        <InputContent>
          <label
            style={labelStyle}
            htmlFor="form-checkout__identificationNumber"
            className="label"
          >
            Documento
          </label>
          <input
            type="text"
            name="identificationNumber"
            id="form-checkout__identificationNumber"
            onBlur={({ target }) => {
              handleBlur(target.value);
            }}
          />
        </InputContent>
        <div className="checkbox">
          <label style={labelStyle} htmlFor="saveData" className="label">
            Salvar dados do cartão
          </label>
          <input
            type="checkbox"
            name="saveData"
            id="saveData"
            defaultChecked={saveDataValue}
            onChange={handleSaveDataChecked}
          />
        </div>
        <StyledButtom type="submit" id="form-checkout__submit">
          Pagar
        </StyledButtom>
      </StyledForm>
    </>
  );
}
export default function Checkout() {
  const [openModalAddCard, setOpenModalAddCard] = useState(false);

  const handleOpenModal = async () => {
    setOpenModalAddCard(!openModalAddCard);
  };

  return (
    <Container>
      <h3>Como você prefere pagar?</h3>
      <h4>Com cartão</h4>

      <Grid>
        <Box>
          <h3>Endereço de Entrega</h3>
          <AddressSelect
            name="address"
            handleSelect={(option) => { console.log('option >>>', option) }}
            options={[
              { description: 'teste', id: '23847278346232' },
              { description: 'teste2', id: '23424242422' },
            ]}
            defaultSelected="23847278346232" />
        </Box>
        <Box>
          <h3>Método de Pagamento</h3>
          <span onClick={() => handleOpenModal()}>+ Adicionar cartão</span>
        </Box>
      </Grid>

      <ReactModal style={customStyle} isOpen={openModalAddCard}>
        <ModalForm handleCloseModal={setOpenModalAddCard} />
      </ReactModal>
    </Container>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'uplay.token': token } = parseCookies(ctx);
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      },
    };
  }
  return {
    props: {}
  };
};
