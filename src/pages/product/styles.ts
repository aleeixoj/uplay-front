import * as AvatarPrimitive from '@radix-ui/react-avatar';
import Select from 'react-select';
import styled from 'styled-components';

import { Button } from '../../Components/Button';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  flex-direction: column;
  flex-wrap: wrap;
  @media (min-width: 768px) {
    flex-direction: row;
  }
  .bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;
    .carousel {
      padding: 1rem;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 10px;
      span {
        font-size: 0.875rem;
      }

      ::after,
      ::before {
        content: '';
        width: 100%;
        height: 1px;
        border-radius: 1rem;
        background: ${(props) => props.theme.colors.gray[200]};
      }
    }
    .payment {
      background: ${(props) => props.theme.colors.green[200]};
      color: white;
      width: 15rem;
      height: 3rem;
      padding: 1rem 0;
      justify-content: center;
      align-items: center;
      display: flex;
      flex-direction: row;
      gap: 10px;
      border-radius: 0.5rem;
      font-weight: 600;
      svg {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
`;

export const ProductImage = styled.div`
  width: min(100%, 25rem);
  height: 25rem;
  background: ${(props) => props.theme.colors.base.bg2};
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProductInfo = styled.div`
  padding: 0.875rem 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  gap: 1.5rem;
  @media (min-width: 768px) {
    padding: 0 0.875rem;
  }
  .texts,
  .icons {
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .texts {
    flex-direction: column;
    gap: 1rem;
    .info {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
    }

    .track {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 8px;
      flex-direction: column;
      .payments {
        color: ${(props) => props.theme.colors.base.links};
        cursor: pointer;
      }
      .send {
        svg {
          width: 1.5rem;
          height: 1.5rem;
        }
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        color: ${(props) => props.theme.colors.green[200]};
      }
    }

    .stock {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      gap: 2px;
      font-size: 0.875rem;
      .form {
        max-width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;
        span:first-child {
          color: ${(props) => props.theme.colors.base.text};
        }
        span {
          color: ${(props) => props.theme.colors.gray[200]};
        }
      }
    }
  }
  .icons {
    flex-direction: row;
  }
`;
export const ProductCheckout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  padding: 1rem;
`;

export const StyledSelect = styled(Select)`
  border: 0;
  background: ${(props) => props.theme.colors.base.bg};
  font-size: 0.875rem;
  font-weight: 600;
`;

export const StyledButton = styled(Button)`
  width: 15rem;
  background: ${(props) => props.theme.colors.orange[800]};
`;

export const ProductDescription = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  width: min(100%, 80rem);
  padding: 1rem;
  flex-wrap: wrap;
  @media (min-width: 768px) {
    flex-direction: row;
  }
  .content {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    padding: 1rem;
    @media (min-width: 768px) {
      flex-direction: row;
    }
  }
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
  }

  .comment {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 1rem;

    .commentContent {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: row;
      gap: 1rem;
    }
  }

  .box {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 0.875rem;
    gap: 1rem;
    .icons {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      flex-wrap: wrap;
      width: min(100%, 8rem);
      gap: 1rem;
      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 3.5rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .moreProducts {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    @media (min-width: 768px) {
      border-left: 1px solid ${(props) => props.theme.colors.gray[200]};
      padding: 0 1rem;
    }
    .all {
      display: grid;
      justify-content: center;
      align-items: center;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }
  }
`;
const StyledAvatar = styled(AvatarPrimitive.Root)`
  display: inline-flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  width: 2.813rem;
  height: 2.813rem;
  border-radius: 100%;
  background-color: ${(props) => props.theme.colors.purple[800]};
`;

const StyledImage = styled(AvatarPrimitive.Image)`
  width: 2.5rem;
  height: 2.5rem;
  object-fit: cover;
  border-radius: inherit;
`;

const StyledFallback = styled(AvatarPrimitive.Fallback)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.gray[100]};
  color: ${(props) => props.theme.colors.purple[800]};
  font-size: 15;
  line-height: 1;
  font-weight: 500;
`;

export const Avatar = StyledAvatar;
export const AvatarImage = StyledImage;
export const AvatarFallback = StyledFallback;

export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 10rem;
  width: 8rem;

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
