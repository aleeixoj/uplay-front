import Image from 'next/image';

import type { Categories } from '../../pages/categories';
import { Container, Img } from './styles';

function CategoryCard({ name, image }: Categories) {
  return (
    <Container>
      <Img>
        <Image
          src={`${process.env.NEXT_PUBLIC_URL_API}/tmp/categories/${image}`}
          width="100%"
          height="100%"
          objectFit="cover"
        ></Image>
      </Img>
      <span>{name}</span>
    </Container>
  );
}

export { CategoryCard };
