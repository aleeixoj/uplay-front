import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  FiShoppingCart,
  FiSearch,
  FiMenu,
  FiMapPin,
  FiChevronDown,
} from 'react-icons/fi';
import { MdOutlineNotificationsNone } from 'react-icons/md';

import { useViewport } from '../../hooks/useViewPort';
import { Button } from '../Button';
import Input from '../CustomInput';
import {
  Mobile,
  Logo,
  Icons,
  RoundedButton,
  Desktop,
  StyledMenu,
  StyledContent,
  StyledLink,
  StyledList,
  StyledTrigger,
  StyledItem,
  StyledIndicator,
  Avatar,
  AvatarFallback,
  AvatarImage,
  StyledInput,
} from './styles';

interface IInputProps {
  name: string;
}

function Header() {
  const { handleSubmit, register } = useForm();
  const onSubmit: SubmitHandler<IInputProps> = (data: any) => {
    console.log(data);
  };
  const { width: screen } = useViewport();

  return (
    <>
      {screen <= 768 ? (
        <Mobile>
          <Logo>
            <Link href="/">
              <a>
                <Image src="/app.svg" width={70} height={70} />
              </a>
            </Link>
          </Logo>

          <Icons>
            <Link href="/">
              <a>
                <FiSearch />
              </a>
            </Link>

            <Link href="/cart">
              <a>
                <FiShoppingCart />
              </a>
            </Link>

            <RoundedButton>
              <FiMenu />
            </RoundedButton>
          </Icons>
        </Mobile>
      ) : (
        <Desktop>
          <div className="top">
            <Logo>
              <Link href="/">
                <a>
                  <Image src="/app.svg" width={100} height={100} />
                </a>
              </Link>
            </Logo>

            <form
              onSubmit={handleSubmit((data: any) => {
                onSubmit(data);
              })}
            >
              <StyledInput
                register={register}
                name="search"
                label={'Buscar produto'}
              >
                <RoundedButton type="submit" style={{ background: 'none' }}>
                  <FiSearch />
                </RoundedButton>
              </StyledInput>
            </form>
          </div>
          <div className="bottom">
            <div className="address">
              <div className="icon">
                <FiMapPin />
              </div>
              <div className="text">
                <span>Enviar para</span>
                <span>Rua Nazilio Camargo</span>
              </div>
            </div>
            <div className="centerMenu">
              <StyledMenu>
                <StyledList>
                  <StyledItem>
                    <StyledTrigger>Categorias</StyledTrigger>
                    <StyledContent>
                      <StyledLink href="/">Acessórios</StyledLink>
                      <StyledLink href="/">Áudio e vídeo</StyledLink>
                      <StyledLink href="/">Capinhas</StyledLink>
                      <StyledLink href="/">Peliculas</StyledLink>
                    </StyledContent>
                  </StyledItem>

                  <StyledItem>
                    <StyledLink href="/">Promoções</StyledLink>
                  </StyledItem>

                  <StyledItem>
                    <StyledLink href="/">Todos os produtos</StyledLink>
                  </StyledItem>
                  <StyledIndicator />
                </StyledList>

                <NavigationMenuPrimitive.Viewport />
              </StyledMenu>
            </div>
            <div className="rightMenu">
              <StyledMenu>
                <StyledList>
                  <StyledItem>
                    <div className="avatar">
                      <Avatar>
                        <AvatarImage src={'/vercel.svg'} alt="Aleixo Junior" />
                        <AvatarFallback delayMs={600}>AJ</AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="userName">
                      <span>Aleixo</span>
                    </div>
                  </StyledItem>

                  <StyledItem>
                    <StyledLink href="/">Compras</StyledLink>
                  </StyledItem>

                  <StyledItem>
                    <StyledLink href="/">Favoritos</StyledLink>
                  </StyledItem>
                  <StyledItem>
                    <RoundedButton>
                      <MdOutlineNotificationsNone />
                    </RoundedButton>
                  </StyledItem>
                  <StyledItem>
                    <Link href="/cart">
                      <RoundedButton>
                        <FiShoppingCart />
                      </RoundedButton>
                    </Link>
                  </StyledItem>
                  <StyledIndicator />
                </StyledList>

                <NavigationMenuPrimitive.Viewport />
              </StyledMenu>
            </div>
          </div>
        </Desktop>
      )}
    </>
  );
}

export { Header };
