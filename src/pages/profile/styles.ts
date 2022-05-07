import * as AvatarPrimitive from '@radix-ui/react-avatar';
import Modal from 'react-modal';
import styled from 'styled-components';

import Input from '../../Components/CustomInput';
import ProfileCard from '../../Components/ProfileCard';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;

export const StyledProfileCard = styled(ProfileCard)`
  cursor: pointer;
`;

export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 1rem;
  width: min(90%, 25rem);
  height: 30rem;
  background: ${(props) => props.theme.colors.base.bg2};
  border-radius: 1rem;
`;

const StyledAvatar = styled(AvatarPrimitive.Root)`
  display: inline-flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  width: 8rem;
  height: 8rem;
  border-radius: 100%;
  background-color: ${(props) => props.theme.colors.purple[800]};
  position: relative;
  .icon {
    z-index: 9999;
    position: absolute;

    .cam {
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 5rem;
      height: 5rem;
      border: 2px dashed white;
      border-radius: 100%;
    }
    svg {
      width: 2.5rem;
      height: 2.5rem;
    }
  }
`;

const StyledImage = styled(AvatarPrimitive.Image)`
  width: 8rem;
  height: 8rem;
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
  font-size: 1.5rem;
  line-height: 1px;
  font-weight: 500;
`;
// Exports
export const Avatar = StyledAvatar;
export const AvatarImage = StyledImage;
export const AvatarFallback = StyledFallback;
export const StyledModal = styled.div`
  margin: 0 auto;
  padding: 1rem;
  width: min(90%, 25rem);
  height: 25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colors.base.bg2};
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
export const UserData = styled.div`
  .infos {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;
export const StyledInput = styled(Input)``;
