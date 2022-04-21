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
export const Left = styled.div`
  width: 4rem;
  height: 100%;
  background: ${(props) => props.theme.colors.base.bg2};
  display: none;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  display: none;

  span {
    color: ${(props) => props.theme.colors.gray[200]};
  }

  button {
    background: none;
    color: ${(props) => props.theme.colors.base.links};
  }

  @media (min-width: 768px) {
    display: none;
  }
`;
export const Right = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 10rem;
  width: 10rem;

  .img {
    background: ${(props) => props.theme.colors.base.bg2};
    border-radius: 1rem;
  }
  .texts {
    font-size: 0.875rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
