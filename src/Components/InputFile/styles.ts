import styled from 'styled-components';

export const InputContent = styled.div`
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  input[type='file'] {
    display: none;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5rem;
    height: 5rem;
    border: 2px dashed ${(props) => props.theme.colors.base.text};
    color: ${(props) => props.theme.colors.base.text};
    border-radius: 100%;
    overflow: hidden;
    font-size: 16px;
    transition: 0.2s;
    cursor: pointer;
    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
    &:hover {
      border-color: #ec6094;
      color: #ec6094;
    }

    &.with-file {
      border-color: #bd93f9;
      color: #bd93f9;
    }

    & span {
      overflow: hidden;
    }


  }
`;
