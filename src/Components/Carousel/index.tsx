/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIos,
} from 'react-icons/md';

import { GetStringPrice } from '../../common/getStringPrice';
import { useViewport } from '../../hooks/useViewPort';
import { User } from '../../pages/product/[slug]';
import { Box } from './styles';

interface IProductImages {
  id: string;
  productId: string;
  image_name: string;
  image_url: string;
}

type Comment = {
  id: string;
  userId: string;
  created_at: string;
  updated_at: string;
  productId: string;
  comment: string;
  user: User;
};

interface IProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  warranty: string;
  color: string;
  reference: string;
  code: string;
  stock: string;
  brand: string;
  categoryId: string;
  comments: Comment[];
  product_image: IProductImages[];
}

interface IBanners {
  id: string;
  src: string;
  redirectTo: string;
  desc: string;
}

interface ICarouselProps {
  type: string;
  products?: IProduct[];
  banners?: IBanners[];
  productImages?: IProductImages[];

}

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: any) => void;
}) {
  const disabeld = props.disabled ? ' arrow--disabled' : '';
  return (
    <div
      onClick={props.onClick}
      className={`arrow ${props.left ? 'arrow--left' : 'arrow--right'
        } ${disabeld}`}
    >
      {!props.left && <MdOutlineArrowForwardIos />}
      {props.left && <MdOutlineArrowBackIos />}
    </div>
  );
}

function Carousel({ banners, productImages, products, type }: ICarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const { width: screen } = useViewport();
  const miniC = type === 'scroll' ? {
    perView: screen >= 1024 ? 6 : screen >= 768 ? 5 : screen >= 425 ? 4 : 2,
    spacing: 15,
  } : {};
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      loop: true,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
      slides: miniC,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            if (type !== 'productimg') {
              slider.next();
            }
          }, 2000);
        }
        slider.on('created', () => {
          slider.container.addEventListener('mouseover', () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener('mouseout', () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on('dragStarted', clearNextTimeout);
        slider.on('animationEnded', nextTimeout);
        slider.on('updated', nextTimeout);
      },
    ],
  );

  return (
    <Box type={type}>

      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">

          {type === 'banner'
            ? banners?.map((banner) => (
              <div key={banner.id} className="keen-slider__slide box">

                <Link href={banner.redirectTo}>
                  <a>
                    <img src={banner.src} alt={banner.desc} />
                  </a>
                </Link>
              </div>
            ))
            : type === 'scroll'
              ? products?.map((product) => (
                <div key={product.id} className="keen-slider__slide miniBox">

                  <Link href={`/product/${product.id}`}>
                    <a>
                      <div className="img">
                        <Image
                          width={500} height={500}
                          objectFit={'cover'}
                          quality="100"
                          src={`${product?.product_image?.[0]?.image_url || '/'}`}
                          alt={`${product?.product_image?.[0]?.image_name}`} />
                      </div>
                      <div className="texts">
                        <span>{product.name}</span>
                        <span>R$ {GetStringPrice.getStringPrice(product.price)}</span>
                      </div>
                    </a>
                  </Link>
                </div>
              ))
              : type === 'productimg' ? (
                productImages?.map((image) => (
                  <div key={image.id} className="keen-slider__slide imageBox">
                    <div className="img">
                      <Image width={1200} height={1200}
                        objectFit="cover"
                        quality={100}
                        src={`${image.image_url || '/'}`}
                        alt={`${image.image_name}`} />
                    </div>
                  </div>
                ))
              ) : ''
          }
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide
                // eslint-disable-next-line no-unsafe-optional-chaining
                === instanceRef?.current?.track?.details?.slides?.length - 1
              }
            />
          </>
        )}
      </div>
      {loaded && instanceRef.current && (
        type !== 'productimg'
        && <div className="dots">
          {[
            ...Array(instanceRef?.current?.track?.details?.slides?.length).keys(),
          ].map((idx) => (
            <button
              key={idx}
              onClick={() => {
                instanceRef.current?.moveToIdx(idx);
              }}
              className={`dot${currentSlide === idx ? ' active' : ''}`}
            ></button>
          ))}
        </div>
      )}
    </Box>
  );
}

export { Carousel };
