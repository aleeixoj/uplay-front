import { useEffect, useState } from 'react';
import { FiCheck, FiCreditCard, FiX } from 'react-icons/fi';

import { Carousel } from '../../Components/Carousel';
import { api } from '../../service/api';
import { Container, Success, Declined, StyledButton } from './styles';

export default function Order() {
  const [products, setProducts] = useState([]);

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
    <Container>
      {/* <Success>
        <div className="order">
          <h4>Pronto, seu pedido foi aprovado</h4>
          <h4>Número do pedido: 0000000000</h4>

          <div className="rounded">
            <FiCheck />
          </div>
        </div>

        <div className="address">
          <span>Chegará entre quinta e sexta-feira</span>
          <span>No Endereço Rua Nazilio Camargo, 107</span>
        </div>

        <div className="payed">
          <div className="icon">
            <FiCreditCard />
          </div>
          <div className="desc">
            <span className="value">Você pagou 1x de R$ 224,98</span>
            <span className="total">Total R$224,98</span>
          </div>
        </div>

        <h4>Talvez você também goste</h4>
        {products.length > 0 && <Carousel type="scroll" products={products} />}
      </Success> */}
      <Declined>
        <div className="order">
          <h4>Houve uma falha com seu pagamento</h4>

          <div className="rounded">
            <FiX />
          </div>
        </div>

        <div className="address">
          <span>
            Verifique os dados e tente novamente, caso persista entre em contato
            com a central de seu cartão
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
        {products.length > 0 && <Carousel type="scroll" products={products} />}
      </Declined>
    </Container>
  );
}
