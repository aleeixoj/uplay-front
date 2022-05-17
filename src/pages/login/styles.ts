import styled from 'styled-components';

import { Button } from '../../Components/Button';
import Input from '../../Components/CustomInput';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;

  .notAccount {
    font-size: 0.75rem;
    color: ${(props) => props.theme.colors.base.text};

    a {
      ${(props) => props.theme.colors.base.links};
    }
  }
`;

export const StyledInput = styled(Input)`
  width: (20rem, 30rem) !important;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20rem;
  height: 20rem;
  padding: 1rem;
`;

export const Separator = styled.div`
  width: 90%;
  background: ${(props) => props.theme.colors.gray[200]};
  height: 1px;
  border-radius: 100%;
  margin: 1rem;
  @media (min-width: 768px) {
    width: 1px;
    height: 40rem;
  }
`;

export const StyledButton = styled(Button)`
  background: ${(props) => props.theme.colors.orange[800]};
  width: 15rem;
  margin-top: 1rem;
`;

export const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  a {
    font-size: 0.75rem;
    left: 0.3rem;
    position: absolute;
    bottom: 4rem;
    color: ${(props) => props.theme.colors.base.links};
  }
`;

export const Box = styled.div`
  background: #f0f0f5;
  height: 25rem;
  width: min(90%, 80rem);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  flex-direction: column;
  span {
    font-size: 0.875rem;
  }

  @media (min-width: 768px) {
    width: min(80%, 35rem);
  }
`;
