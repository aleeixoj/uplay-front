import Image from 'next/image';

import type { Categories } from '../../pages/categories';
import { Container, Img } from './styles';

function CategoryCard({ name, image_url }: Categories) {
  return (
    <Container>
      <Img>
        <Image
          src={`${image_url || '/'}`}
          width={400}
          height={100}
          objectFit="cover"
          quality={100}
        ></Image>
      </Img>
      <span>{name}</span>
    </Container>
  );
}

export { CategoryCard };
