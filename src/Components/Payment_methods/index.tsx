import { Box, Container, Item } from './styles';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { api } from '../../service/api';

type PaymentsTypes = {
  id: string;
  thumbnail: string;
  name: string;
  payment_type_id: string;
}


type PaymentsProps = {
  paymentsTypes: PaymentsTypes[]
}

export default function PaymentMethods({ paymentsTypes }: PaymentsProps) {
  return (
    <Container>
      <h3>Como você prefere pagar?</h3>
      <h4>Com Mercado pago</h4>
      <Box>
        {paymentsTypes?.map((type) => (
          type.payment_type_id === 'debit_card' || type.payment_type_id === 'credit_card' &&
          <Item key={type.id} onClick={() => console.log(type.id)}>
            <div className="icon">
              <Image src={type.thumbnail} alt={type.name} width={500} height={250}></Image>
            </div>
            <div className="card">
              <div className="info">
                <span>{type.name}</span>

              </div>
              <div className="juros">
                <span>10 x sem juros</span>
              </div>
            </div>
          </Item>
        ))}
      </Box>
      <h4>Com outros meios de pagamento</h4>
      <Box>
        {paymentsTypes?.map((type) => (
          type.payment_type_id !== 'debit_card' && type.payment_type_id !== 'credit_card' &&
          <Item key={type.id} onClick={() => console.log(type.id)}>
            <div className="icon">
              <Image src={type.thumbnail} alt={type.name} width={500} height={200}></Image>
            </div>
            <div className="card">
              <div className="info">
                <span>{type.name}</span>

              </div>
              <div className="juros">
                <span>10 x sem juros</span>
              </div>
            </div>
          </Item>
        ))}
      </Box>
    </Container >
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('/payments/payments_types');

  const paymentsTypes = data.map(((type: PaymentsTypes) => ({
    id: type.id,
    name: type.name,
    thumbnail: type.thumbnail,
    payment_type_id: type.payment_type_id
  })))

  return {
    props: { paymentsTypes },
    revalidate: 60 * 60 * 24,
  };
};