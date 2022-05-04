import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { prependOnceListener } from 'process';
import styled, { keyframes } from 'styled-components';

import Input from '../CustomInput';

const enterFromRight = keyframes`
  from { 
    transform: translateX(200px); 
    opacity: 0 
  };
  to { 
    transform: translateX(0);
    opacity: 1 
  };
`;

const enterFromLeft = keyframes`
  from {
    transform: translateX(-200px);
    opacity: 0;
  };
  to { 
    transform: translateX(0);
     opacity: 1;
  };
`;

const exitToRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(200px);
    opacity: 0;
  }
`;

const exitToLeft = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-200px);
    opacity: 0;
  }
`;

const scaleIn = keyframes`
  from {
    transform: rotateX(-30deg) scale(0.9);
    opacity: 0;
  }
  to {
    transform: rotateX(0deg) scale(1);
    opacity: 1;
  }
`;

const scaleOut = keyframes`
  from {
    transform: rotateX(0deg) scale(1);
    opacity: 1;
  }
  to {
    transform: rotateX(-10deg) scale(0.95);
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const StyledMenu = styled(NavigationMenuPrimitive.Root)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25rem;
  z-index: 1;
`;

export const StyledItem = styled(NavigationMenuPrimitive.Item)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 0.75rem;
`;

export const StyledList = styled(NavigationMenuPrimitive.List)`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem;
  border-radius: 6px;
  list-style: none;
  color: ${(props) => props.theme.colors.orange[800]};
`;

export const StyledIndicator = styled(NavigationMenuPrimitive.Indicator)`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 10px;
  top: 100%;
  overflow: hidden;
  z-index: 1;

  @media (prefers-reduced-motion: no-preference) {
    transition: width;
    transform: 250ms ease;
    &[data-state='visible'] {
      animation: ${fadeIn} 200ms ease;
    }
    &[data-state='hidden'] {
      animation: ${fadeOut} 200ms ease;
    }
  }
`;

export const StyledTrigger = styled(NavigationMenuPrimitive.Trigger)`
  padding: 0.5rem;
  outline: none;
  user-select: none;
  line-height: 1px;
  border-radius: 4px;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.orange[700]};
  transition: all ease 0.2s;
  &:focus {
    position: relative;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.5);
  }
  &:hover {
    color: ${(props) => props.theme.colors.orange[800]};
  }

  all: unset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2px;
`;

export const StyledLink = styled(NavigationMenuPrimitive.Link)`
  display: block;
  width: 100%;
  padding: 0.7rem;
  outline: none;
  user-select: none;
  line-height: 1px;
  border-radius: 4px;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.orange[700]};
  &:focus {
    position: relative;
  }
  &:hover {
    color: ${(props) => props.theme.colors.orange[800]};
  }
`;

export const StyledContent = styled(NavigationMenuPrimitive.Content)`
  width: 100%;
  display: inline-block;
  position: absolute;
  top: 2rem;
  left: 0.875rem;
  background: white;
  @media only screen and (min-width: 600px) {
    width: auto;
  }
  @media (prefers-reduced-motion: no-preference) {
    animation-duration: 250ms;
    animation-timing-function: ease;
    &[data-motion='from-start'] {
      animation-name: ${enterFromLeft};
    }
    &[data-motion='from-end'] {
      animation-name: ${enterFromRight};
    }
    &[data-motion='to-start'] {
      animation-name: ${exitToLeft};
    }
    &[data-motion='to-end'] {
      animation-name: ${exitToRight};
    }
  } ;
`;

export const Mobile = styled.header`
  padding: 1.4rem 2.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
`;
export const Desktop = styled.header`
  padding: 1rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 12rem;
  background: white;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray[200]};
  .top {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 5rem;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    .address {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      gap: 1rem;
      width: 10rem;
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        color: ${(props) => props.theme.colors.orange[800]};

        width: 2.5rem;
        height: 2.5rem;

        svg {
          width: 2rem;
          height: 2rem;
        }
      }
      .text {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        span {
          font-size: 0.875rem;
          color: ${(props) => props.theme.colors.orange[800]};
        }
      }
    }
    .centerMenu {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 2.5rem;
      width: (50%, 25rem);
    }
    .rigthMenu {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 2.5rem;
      width: (50%, 25rem);
    }
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  a {
    color: ${(props) => props.theme.colors.orange[800]};
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    transition: all 0.2s;
    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
    &:hover {
      background: ${(props) => props.theme.colors.gray[50]};
    }
  }
`;

export const RoundedButton = styled.button`
  color: ${(props) => props.theme.colors.orange[800]};
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  transition: all 0.2s;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  &:hover {
    background: ${(props) => props.theme.colors.gray[50]};
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

export const StyledInput = styled(Input)`
  width: 30rem;
`;

// Exports
export const Avatar = StyledAvatar;
export const AvatarImage = StyledImage;
export const AvatarFallback = StyledFallback;
