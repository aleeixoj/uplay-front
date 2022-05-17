import styled from 'styled-components';

export const Box = styled.div.attrs((props) => ({
  type: props.type,
}))`
  width: 100%;
  .imageBox {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    min-width: 25rem !important;

    .img {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      /* background: rgb(182, 255, 64);
      background: linear-gradient(
        128deg,
        rgba(182, 255, 64, 1) 0%,
        rgba(63, 255, 71, 1) 100%
      ); */
      border-radius: 1rem;
      width: 100%;
      height: 25rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .box {
    /* background: rgb(182, 255, 64);
    background: linear-gradient(
      128deg,
      rgba(182, 255, 64, 1) 0%,
      rgba(63, 255, 71, 1) 100%
    ); */
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15rem;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .miniBox {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    overflow: none;
    text-overflow: ellipsis;

    .img {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background: rgb(182, 255, 64);
      background: linear-gradient(
        128deg,
        rgba(182, 255, 64, 1) 0%,
        rgba(63, 255, 71, 1) 100%
      );
      border-radius: 1rem;
      width: 8rem;
      height: 8rem;
      img {
        width: 8rem;
        height: 8rem;
      }
    }

    .texts {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: ${(props) => props.theme.colors.base.text};
      font-size: 0.875rem;
    }
  }

  .navigation-wrapper {
    position: relative;

    padding: ${(props) => (props.type === 'productimg' ? 'unset' : '0 10%')};
  }

  .dots {
    display: flex;
    padding: 10px 0;
    justify-content: center;
  }

  .dot {
    border: none;
    width: 10px;
    height: 10px;
    background: #c5c5c5;
    border-radius: 50%;
    margin: 0 5px;
    padding: 5px;
    cursor: pointer;
  }

  .dot:focus {
    outline: none;
  }

  .dot.active {
    background: #000;
  }

  .arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: ${(props) => props.theme.colors.orange[800]};
    cursor: pointer;
    background: ${(props) => props.theme.colors.gray[50]};
    border-radius: 50%;

    &:hover {
      box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.34);
    }

    @media (max-width: 768px) {
      display: none;
    }
  }

  .arrow--left {
    left: 5px;
  }

  .arrow--right {
    left: auto;
    right: 5px;
  }

  .arrow--disabled {
    color: none;
    background: none;
    box-shadow: unset;
  }
`;
