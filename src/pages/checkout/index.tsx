import _ from 'lodash';
import { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import ReactModal from 'react-modal';

import { Button } from '../../Components/Button';
import { useMercadopago } from '../../hooks/useMercadopago';
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

  const cardForm = openModalAddCard && !_.isNil(mercadoPago)
    ? setTimeout(() => {
      mercadoPago.cardForm({
        amount: '100.5',
        autoMount: true,
        form: {
          id: 'form-checkout',
          cardholderName: {
            id: 'form-checkout__cardholderName',
            placeholder: 'Titular do cartão',
          },
          cardNumber: {
            id: 'form-checkout__cardNumber',
            placeholder: 'Número do cartão',
          },
          expirationDate: {
            id: 'form-checkout__expirationDate',
            placeholder: 'Data de vencimento (MM/YYYY)',
          },
          securityCode: {
            id: 'form-checkout__securityCode',
            placeholder: 'Código de segurança',
          },
          installments: {
            id: 'form-checkout__installments',
            placeholder: 'Parcelas',
          },
          identificationType: {
            id: 'form-checkout__identificationType',
            placeholder: 'Tipo de documento',
          },
          identificationNumber: {
            id: 'form-checkout__identificationNumber',
            placeholder: 'Número do documento',
          },
          issuer: {
            id: 'form-checkout__issuer',
            placeholder: 'Banco emissor',
          },
        },
        callbacks: {
          onFormMounted: (error) => {
            if (error) {
              return console.warn('Form Mounted handling error: ', error);
            }
            console.log('Form mounted');
          },
          // onSubmit: (event) => {
          //   event.preventDefault();

          //   const {
          //     paymentMethodId: payment_method_id,
          //     issuerId: issuer_id,
          //     cardholderEmail: email,
          //     amount,
          //     token,
          //     installments,
          //     identificationNumber,
          //     identificationType,
          //   } = cardForm.getCardFormData();

          //   fetch('/process_payment', {
          //     method: 'POST',
          //     headers: {
          //       'Content-Type': 'application/json',
          //     },
          //     body: JSON.stringify({
          //       token,
          //       issuer_id,
          //       payment_method_id,
          //       transaction_amount: Number(amount),
          //       installments: Number(installments),
          //       description: 'Descrição do produto',
          //       payer: {
          //         email,
          //         identification: {
          //           type: identificationType,
          //           number: identificationNumber,
          //         },
          //       },
          //     }),
          //   });
          // },
          // onFetching: (resource) => {
          //   console.log('Fetching resource: ', resource);

          //   // Animate progress bar
          //   const progressBar = document.querySelector('.progress-bar');
          //   progressBar.removeAttribute('value');

          //   return () => {
          //     progressBar.setAttribute('value', '0');
          //   };
          // },
        },
      });
    }, 500)
    : '';

  return (
    <Container>
      <h3>Como você prefere pagar?</h3>
      <h4>Com cartão</h4>
      <Box>
        <span onClick={() => setOpenModalAddCard(true)}>
          + Adicionar cartão
        </span>
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
            type="text"
            name="expirationDate"
            id="form-checkout__expirationDate"
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
