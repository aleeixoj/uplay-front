import styled from 'styled-components';

import { Button } from '../../Components/Button';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: min(90%, 30rem) min(90%, 30rem);
  grid-template-rows: 400px;
  justify-content: center;
  gap: 1rem;
`;

export const Box = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 1rem;
  width: 100%;

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

export const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  flex-wrap: wrap;

  input,
  select {
    outline: none;
    height: 2rem;
    font-size: 1rem;
    color: ${(props) => props.theme.colors.orange[500]};
    border-radius: 1rem;
    border: 1px solid ${(props) => props.theme.colors.orange[200]};
    padding: 0 1rem 0 0.625rem;
    background: none;
    z-index: 1;
    &:focus,
    &:hover {
      border: 1px solid ${(props) => props.theme.colors.orange[800]};
    }
  }

  .year,
  .selects {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #form-checkout__cardExpirationMonth,
  #form-checkout__cardExpirationYear {
    width: 5.5rem;
  }
  #form-checkout__installments,
  #form-checkout__identificationType {
    width: 8.5rem;
  }

  #form-checkout__securityCode {
    width: 4.5rem;
  }

  .checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
`;
export const InputContent = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
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
  .label {
    font-size: 1rem;
    color: ${(props) => props.theme.colors.orange[200]};
    position: absolute;
    transition: all ease 0.3s;
    left: 0.625rem;
    top: 0.39rem;
    z-index: 0;
  }

  &:focus-within {
    .label {
      background: ${(props) => props.theme.colors.base.bg};
      font-size: 0.875rem;
      top: -0.5rem;
      left: 0.8rem;
      z-index: 2;
      color: ${(props) => props.theme.colors.orange[800]};
    }
  }

  span.input-error {
    width: 100%;
    display: flex;
    color: red;
    margin-left: 20px;
    margin-top: 5px;
  }
  span.focusInput {
    display: block;
    position: absolute;
    width: 100%;
    height: 50px;
    border-radius: 25px;
    top: 0;
    left: 0;
    z-index: -1;
    box-shadow: 0px 0px 0px 0px;
    color: #fff;
  }
  input:focus + .focusInput,
  select:focus + .focusInput {
    -webkit-animation: anim-shadow 0.5s ease-in-out forwards;
    animation: anim-shadow 0.5s ease-in-out forwards;
  }
  span.inputIcon {
    display: flex;
    font-size: 1.6rem;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
    position: absolute;
    top: 0;
    right: 1rem;
    bottom: 0;
    color: ${(props) => props.theme.colors.orange[200]};
    z-index: 99;
  }
  span.inputIcon:hover {
    color: ${(props) => props.theme.colors.orange[800]};
  }
  input:focus + .focusInput + .inputIcon,
  select:focus + .focusInput + .inputIcon {
    color: ${(props) => props.theme.colors.orange[800]};
    padding-left: 20px;
  }
  /** ANIMATION */
  @keyframes anim-shadow {
    to {
      box-shadow: 0px 0px 70px 25px;
      opacity: 0;
    }
  }
`;

export const StyledButtom = styled(Button)`
  background-color: ${(props) => props.theme.colors.orange[200]};
  color: white;
  transition: 0.2s all ease;
  &:hover {
    background-color: ${(props) => props.theme.colors.orange[800]};
  }
`;
