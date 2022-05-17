import styled from 'styled-components';

import Input from '../../Components/CustomInput';

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

  > span {
    font-size: 0.875rem;
    color: ${(props) => props.theme.colors.blue[200]};
    cursor: pointer;
    transition: 0.2s all ease;
    &:hover {
      color: ${(props) => props.theme.colors.blue[800]};
    }
  }
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
export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  color: ${(props) => props.theme.colors.orange[500]};
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 999;
  width: 1.5rem;
  height: 1.5rem;
  transition: all ease 0.2s;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &:hover {
    color: ${(props) => props.theme.colors.orange[800]};
  }
`;
export const ProductCheckout = styled.div``;
export const StyledInput = styled(Input)``;
export const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  input {
    outline: none;
    height: 2rem;
    font-size: 1rem;
    color: ${(props) => props.theme.colors.orange[500]};
    border-radius: 1rem;
    border: 1px solid ${(props) => props.theme.colors.orange[200]};
    padding: 0 1.875rem 0 0.625rem;
    background: none;
    z-index: 1;
    &:focus,
    &:hover {
      border: 1px solid ${(props) => props.theme.colors.orange[800]};
    }
  }
`;
