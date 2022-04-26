import { Carousel } from '../../Components/Carousel';
import CartCard from '../../Components/cartCard';
import { Container, ProductCheckout, StyledButton, Products } from './styles';

export default function Cart() {
  const imgs = [
    {
      imgSrc: '/landing.svg',
      id: 1,
      imgAlt: 'Landing',
      redirect: '/',
      name: 'Landing',
      price: 'R$ 99.90',
    },
    {
      imgSrc: '/vercel.svg',
      id: 2,
      imgAlt: 'Vercel',
      redirect: '/',
      name: 'Landing',
      price: 'R$ 99.90',
    },
    {
      imgSrc: '/app.svg',
      id: 3,
      imgAlt: 'Logo',
      redirect: '/',
      name: 'Landing',
      price: 'R$ 99.90',
    },
    {
      imgSrc: '/app.svg',
      id: 4,
      imgAlt: 'Logo',
      redirect: '/',
      name: 'Landing',
      price: 'R$ 99.90',
    },
    {
      imgSrc: '/app.svg',
      id: 5,
      imgAlt: 'Logo',
      redirect: '/',
      name: 'Landing',
      price: 'R$ 99.90',
    },
    {
      imgSrc: '/app.svg',
      id: 6,
      imgAlt: 'Logo',
      redirect: '/',
      name: 'Landing',
      price: 'R$ 99.90',
    },
  ];
  return (
    <Container>
      <Products>
        <div className="products">
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
          <CartCard />
        </div>

        <div className="moreProducts">
          <h4>Talvez você também goste</h4>
          <Carousel products={imgs} type="scroll" />
        </div>
      </Products>
      <ProductCheckout>
        <div className="envio">
          <span className="address">Envio: Rua Nazilio Camargo, 107</span>
          <span className="frete">Grátis</span>
        </div>
        <div className="total">
          <span className="text">Total:</span>
          <span className="valor">R$ 99,99</span>
        </div>

        <StyledButton type="submit"> Finalizar compra </StyledButton>
      </ProductCheckout>
    </Container>
  );
}
