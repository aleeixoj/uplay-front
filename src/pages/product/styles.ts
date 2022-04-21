import Select from 'react-select';
import styled from 'styled-components';

import { Button } from '../../Components/Button';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ProductImage = styled.div`
  width: min(100%, 25rem);
  height: 25rem;
  background: ${(props) => props.theme.colors.base.bg2};
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProductInfo = styled.div`
  padding: 0.875rem 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  gap: 1.5rem;
  @media (min-width: 768px) {
    padding: 0 0.875rem;
  }
  .texts,
  .icons {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .texts {
    flex-direction: column;
    gap: 1rem;
    .info {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
    }

    .track {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 8px;
      flex-direction: column;
      .payments {
        color: ${(props) => props.theme.colors.base.links};
        cursor: pointer;
      }
      .send {
        svg {
          width: 1.5rem;
          height: 1.5rem;
        }
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        color: ${(props) => props.theme.colors.green[200]};
      }
    }

    .stock {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      gap: 2px;
      font-size: 0.875rem;
      .form {
        max-width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;
        span:first-child {
          color: ${(props) => props.theme.colors.base.text};
        }
        span {
          color: ${(props) => props.theme.colors.gray[200]};
        }
      }
    }
  }
  .icons {
    flex-direction: row;
  }
`;
export const ProductCheckout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

export const StyledSelect = styled(Select)`
  border: 0;
  background: ${(props) => props.theme.colors.base.bg};
  font-size: 0.875rem;
  font-weight: 600;
`;

export const StyledButton = styled(Button)`
  background: ${(props) => props.theme.colors.orange[800]};
`;
