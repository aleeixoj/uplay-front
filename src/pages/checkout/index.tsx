import { FiBarChart, FiBarChart2, FiCreditCard } from 'react-icons/fi';

import { Box, Container, Item } from './styles';

export default function Checkout() {
  const cards = [
    {
      bandeira: 'Mastercard',
      value: 0,
      final: '**** 5501',
      description: 'Em até 10x sem juros',
    },
    {
      bandeira: 'Visa',
      value: 2,
      final: '**** 5501',
      description: 'Em até 10x sem juros',
    },
    {
      bandeira: 'Elo',
      value: 3,
      final: '**** 5501',
      description: 'Em até 10x sem juros',
    },
    {
      bandeira: 'Amex',
      value: 4,
      final: '**** 5501',
      description: 'Em até 10x sem juros',
    },
    {
      bandeira: 'Mastercard',
      value: 5,
      final: '**** 5501 ',
      description: 'Em até 10x sem juros',
    },
  ];

  const cards2 = [
    {
      tipo: 'Boleto bancário',
      value: 0,
      description: 'Aprovação em até 3 dias',
    },
    { tipo: 'Pix', value: 1, description: 'Aprovação imediata' },
  ];

  return (
    <Container>
      <h3>Como você prefere pagar?</h3>
      <h4>Com Mercado pago</h4>
      <Box>
        {cards.map((card) => {
          return (
            <Item key={card.value} onClick={() => console.log(card.bandeira)}>
              <div className="icon">
                <FiCreditCard />
              </div>
              <div className="card">
                <div className="info">
                  <span>{card.bandeira}</span>
                  <span>{card.final}</span>
                </div>
                <div className="juros">
                  <span>{card.description}</span>
                </div>
              </div>
            </Item>
          );
        })}
      </Box>
      <h4>Com outros meios de pagamento</h4>
      <Box>
        {cards2.map((card) => {
          return (
            <Item key={card.value} onClick={() => console.log(card.value)}>
              <div className="icon">
                <FiBarChart2 />
              </div>
              <div className="card">
                <div className="info">
                  <span>{card.tipo}</span>
                </div>
                <div className="juros">
                  <span>{card.description}</span>
                </div>
              </div>
            </Item>
          );
        })}
      </Box>
    </Container>
  );
}
