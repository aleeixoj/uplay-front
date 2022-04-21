import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: ${(props) => props.theme.colors.base.bg2};
  height: 8rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  flex-direction: column;
  gap: 5px;
  span {
    text-transform: capitalize;
    color: ${(props) => props.theme.colors.orange[800]};
  }
`;

export const Img = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colors.gray[50]};
  width: 100%;
  height: 6rem;
  border-radius: 1rem;
`;
