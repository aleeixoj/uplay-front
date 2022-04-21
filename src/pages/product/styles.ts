import styled from 'styled-components';

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
  width: 20rem;
  height: 20rem;
  background: ${(props) => props.theme.colors.base.bg2};
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProductInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
