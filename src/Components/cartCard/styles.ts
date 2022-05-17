import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
  padding: 1rem;
  width: min(100%, 30rem);
  position: relative;
  .image {
    background: ${(props) => props.theme.colors.gray[200]};
    width: 5rem;
    height: 5rem;
    border-radius: 1rem;
  }
  .info {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    gap: 1.2rem;
    .left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      .productName {
        font-size: 1rem;
      }
      .productColor {
        font-size: 0.875rem;
        color: ${(props) => props.theme.colors.gray[200]};
      }
      .frete {
        font-size: 0.875rem;
        color: ${(props) => props.theme.colors.green[200]};
      }
      .productQtn {
        font-size: 0.875rem;
        color: ${(props) => props.theme.colors.gray[200]};
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        .btn {
          width: 1.5rem;
          height: 1.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .rigth {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      .price {
        font-size: 1rem;
      }
    }
  }
  .removeCart {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: -1.2rem;
    left: 4rem;
  }
`;

export const RoundedButton = styled.button`
  color: ${(props) => props.theme.colors.rose[800]};
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  transition: all 0.2s;

  svg {
    width: 50%;
    height: 50%;
  }
  &:hover {
    background: ${(props) => props.theme.colors.gray[50]};
  }
`;
