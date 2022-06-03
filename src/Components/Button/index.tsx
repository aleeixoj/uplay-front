/* eslint-disable @typescript-eslint/ban-types */
import { ButtonHTMLAttributes, ReactNode } from 'react';

import { ButtonContainer } from './styles';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ children, ...rest }: IProps) {
  return (
    <>
      <ButtonContainer {...rest}>{children}</ButtonContainer>
    </>
  );
}

export { Button };
