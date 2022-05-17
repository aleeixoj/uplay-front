import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;

export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 1rem;
  width: min(90%, 30rem);

  padding: 1rem;
  background: ${(props) => props.theme.colors.base.bg2};
`;

export const Item = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  width: min(100%, 25rem);
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0.75rem;
  cursor: pointer;
  &::after {
    content: '';
    height: 1px;
    width: 100%;
    background: ${(props) => props.theme.colors.gray[200]};
  }
  .icon {
    width: 1.5rem;
    height: 1.5rem;

    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  .card {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    flex-wrap: wrap;

    .info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      gap: 1.5rem;
      font-size: 1rem;
    }
    .juros {
      color: ${(props) => props.theme.colors.green[200]};
      font-size: 0.875rem;
    }
  }
`;

export const ProductCheckout = styled.div``;
