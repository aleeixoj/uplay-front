/* eslint-disable no-use-before-define */


import { Container, Page, Description } from './styles';

interface IProps {
  title: string;
  description?: string;
}

const Header = ({ title, description }: IProps) => (
  <Container>
    <Page>
      <strong>{title}</strong>
    </Page>
    {description && <Description>{description}</Description>}
  </Container>
);

export default Header;