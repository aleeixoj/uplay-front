import _ from 'lodash';
import { GetServerSideProps } from 'next';
import Router from 'next/router';
import { parseCookies } from 'nookies';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ReactModal from 'react-modal';

import { Button } from '../../Components/Button';
import { useMercadopago } from '../../hooks/useMercadopago';
import { api } from '../../service/api';
import { Box, CloseButton, Container, StyledForm } from './styles';

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
    position: 'relative',
  },
  overlay: {
    zIndex: '999',
    background: 'rgba(0,0,0,0.2)',
  },
};

export default function Checkout({ paymentUser }: any) {
  const [openModalAddCard, setOpenModalAddCard] = useState(false);
  const { mercadoPago } = useMercadopago();

  const handleOpenModal = async () => {
    setOpenModalAddCard(!openModalAddCard);
  };

  function loadCardForm() {
    const cardForm = mercadoPago?.cardForm({
      amount: '105.9',
      autoMount: true,
      form: {
        id: 'form-checkout',
        cardholderName: {
          id: 'form-checkout__cardholderName',
          placeholder: 'Holder name',
        },
        // cardholderEmail: {
        //   id: 'form-checkout__cardholderEmail',
        //   placeholder: 'E-mail',
        // },
        cardNumber: {
          id: 'form-checkout__cardNumber',
          placeholder: 'Card number',
        },
        cardExpirationMonth: {
          id: 'form-checkout__cardExpirationMonth',
          placeholder: 'MM',
        },
        cardExpirationYear: {
          id: 'form-checkout__cardExpirationYear',
          placeholder: 'YY',
        },
        securityCode: {
          id: 'form-checkout__securityCode',
          placeholder: 'Security code',
        },
        installments: {
          id: 'form-checkout__installments',
          placeholder: 'Installments',
        },
        identificationType: {
          id: 'form-checkout__identificationType',
        },
        identificationNumber: {
          id: 'form-checkout__identificationNumber',
          placeholder: 'Identification number',
        },
        issuer: {
          id: 'form-checkout__issuer',
          placeholder: 'Issuer',
        },
      },
      callbacks: {
        onFormMounted: (error) => {
          if (error) {
            return console.warn('Form Mounted handling error: ', error);
          }
          console.log('Form mounted');
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
            identificationType,
          } = cardForm.getCardFormData();

          api
            .post('/payments/process_payment', {
              token,
              issuer_id,
              payment_method_id,
              transaction_amount: Number(amount),
              installments: Number(installments),
              description: 'Descrição do produto',
              payer: {
                email,
                identification: {
                  type: identificationType,
                  number: identificationNumber,
                },
              },
            })
            .then(({ data }) => {
              if (data.createPayment.response.status === 'approved') {
                handleOpenModal();
                Router.push(`order/${data.order.id}`);
              }
            });
        },
      },
    });
  }

  useMemo(() => {
    if (openModalAddCard === true) {
      setTimeout(() => {
        loadCardForm();
      }, 500);
    }
  }, [openModalAddCard]);

  return (
    <Container>
      <h3>Como você prefere pagar?</h3>
      <h4>Com cartão</h4>
      <Box>
        <span onClick={() => handleOpenModal()}>+ Adicionar cartão</span>
      </Box>
      <h4>Com outros meios de pagamento</h4>
      <Box></Box>

      <ReactModal style={customStyle} isOpen={openModalAddCard}>
        <CloseButton onClick={() => setOpenModalAddCard(false)}>
          <AiOutlineCloseCircle />
        </CloseButton>

        <StyledForm id="form-checkout">
          <input type="text" name="cardNumber" id="form-checkout__cardNumber" />
          <input
            id="form-checkout__cardExpirationMonth"
            name="cardExpirationMonth"
            type="text"
          />
          <input
            type="text"
            name="expirationDate"
            id="form-checkout__cardExpirationYear"
          />

          <input
            type="text"
            name="cardholderName"
            id="form-checkout__cardholderName"
          />
          <input
            type="text"
            name="securityCode"
            id="form-checkout__securityCode"
          />
          <select name="issuer" id="form-checkout__issuer"></select>
          <select
            name="identificationType"
            id="form-checkout__identificationType"
          ></select>
          <input
            type="text"
            name="identificationNumber"
            id="form-checkout__identificationNumber"
          />
          <select name="installments" id="form-checkout__installments"></select>
          <Button type="submit" id="form-checkout__submit">
            Pagar
          </Button>
        </StyledForm>
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
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

// export const getStaticProps: GetStaticProps = async () => {
//   const { data } = await api.get('/payments/user');

//   const paymentUser = data.map((type: any) => ({
//     id: type.id,
//     name: type.name,
//     thumbnail: type.thumbnail,
//     payment_type_id: type.payment_type_id,
//   }));

//   return {
//     props: { paymentUser },
//     revalidate: 60 * 60 * 24,
//   };
// };
