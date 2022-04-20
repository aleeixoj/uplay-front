import styled from 'styled-components';

export const InputContent = styled.div`
  position: relative;
  margin-bottom: 1rem;
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
