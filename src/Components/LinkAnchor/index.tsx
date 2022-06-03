import { ReactNode, ComponentPropsWithoutRef } from 'react';

import { LinkContainer } from './styles';

interface ILinkAnchorProps extends ComponentPropsWithoutRef<'a'> {
  children: ReactNode;
}

export const LinkAnchor = ({ children, ...rest }: ILinkAnchorProps) => (
  <LinkContainer>
    <a {...rest}>{children}</a>
  </LinkContainer>
);
