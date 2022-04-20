import styled from 'styled-components';

import { Button } from '../../Components/Button';
import Input from '../../Components/CustomInput';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  span {
    margin-top: 10px;
    font-size: 0.875rem;
    color: ${(props) => props.theme.colors.gray[200]};
    cursor: pointer;
    transition: all ease 0.2s;
  }
`;

export const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledInput = styled(Input)`
  width: (20rem, 30rem) !important;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

  span {
    font-size: 0.875rem;
    color: ${(props) => props.theme.colors.gray[200]};
    cursor: pointer;
    transition: all ease 0.2s;
    &:hover {
      color: ${(props) => props.theme.colors.gray[500]};
    }
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
