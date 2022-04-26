import styled from 'styled-components';

import { Button } from '../../Components/Button';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
`;

export const Products = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: white;
  width: 100%;
  height: 100%;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 10rem;
  .products {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .moreProducts {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1.2rem;
    width: min(80%, 100%);
  }
`;

export const ProductCheckout = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: white;
  width: 100%;
  box-shadow: 0px 0px 16px -2px rgba(0, 0, 0, 0.5);
  gap: 1rem;
  padding: 1rem;
  .envio {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
    padding: 0 0.875rem;
    .address {
      color: ${(props) => props.theme.colors.base.links};
      font-size: 0.875rem;
    }
    .frete {
      color: ${(props) => props.theme.colors.green[200]};
      font-size: 0.875rem;
    }
  }
  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
    padding: 0 0.875rem;
  }
`;

export const StyledButton = styled(Button)`
  width: 12rem;
  background: ${(props) => props.theme.colors.orange[800]};
`;
