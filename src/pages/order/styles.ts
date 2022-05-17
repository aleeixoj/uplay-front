import styled from 'styled-components';

import { Button } from '../../Components/Button';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Success = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  .order {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: ${(props) => props.theme.colors.green[200]};
    width: 100%;
    height: 15rem;
    padding: 1rem;
    position: relative;
    h4 {
      color: white;
      font-weight: 500;
    }
    h4:first-child {
      font-size: 1.25rem;
      font-weight: 500;
    }

    .rounded {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background: ${(props) => props.theme.colors.gray[200]};
      width: 4rem;
      height: 4rem;
      border-radius: 2rem;
      position: absolute;
      top: 13rem;
      svg {
        width: 2.5rem;
        height: 2.5rem;
        color: white;
      }
    }
  }

  .address {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1rem;
    margin-top: 1rem;
  }

  .payed {
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 1rem;
    gap: 1rem;

    background: ${(props) => props.theme.colors.base.bg2};
    border-radius: 1rem;

    margin-bottom: 5rem;
    .icon {
      width: 2rem;
      height: 2rem;

      svg {
        width: 2rem;
        height: 2rem;
      }
    }
    .desc {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      .value {
        font-size: 1rem;
      }
      .total {
        font-size: 0.875rem;
        color: ${(props) => props.theme.colors.gray[200]};
      }
    }
  }
`;

export const Declined = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  .order {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: ${(props) => props.theme.colors.base.errors};
    width: 100%;
    height: 15rem;
    padding: 1rem;
    position: relative;
    text-align: center;
    h4 {
      color: white;
      font-weight: 500;
    }
    h4:first-child {
      font-size: 1.25rem;
      font-weight: 500;
    }

    .rounded {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background: ${(props) => props.theme.colors.gray[200]};
      width: 4rem;
      height: 4rem;
      border-radius: 2rem;
      position: absolute;
      top: 13rem;
      svg {
        width: 2.5rem;
        height: 2.5rem;
        color: white;
      }
    }
  }

  .address {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1rem;
    margin-top: 1rem;
    text-align: center;
  }

  .payed {
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 1rem;
    gap: 1rem;

    background: ${(props) => props.theme.colors.base.bg2};
    border-radius: 1rem;

    margin-bottom: 5rem;
    .icon {
      width: 2rem;
      height: 2rem;

      svg {
        width: 2rem;
        height: 2rem;
      }
    }
    .desc {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      .value {
        font-size: 1rem;
      }
      .total {
        font-size: 0.875rem;
        color: ${(props) => props.theme.colors.gray[200]};
      }
    }
  }
`;

export const StyledButton = styled(Button)`
  width: 15rem;
  background: ${(props) => props.theme.colors.orange[800]};
`;
