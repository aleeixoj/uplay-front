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

import { useViewport } from '../../hooks/useViewPort';
import { Box } from './styles';

interface IProduct {
  id: number;
  imgSrc?: string;
  imgAlt?: string;
  redirect?: string;
  name?: string;
  price?: string;
}

interface IProducts {
  type: string;
  products: IProduct[];
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

function Carousel({ products, type }: IProducts) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const { width: screen } = useViewport()
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
      slides: miniC
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
            slider.next();
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
    ]
  );

  return (
    <Box>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {type === 'banner'
            ? products.map((product) => {
              return (
                <div key={product.id} className="keen-slider__slide box">
                  <Link href={product.redirect}>
                    <a>
                      <img src={product.imgSrc} alt={product.imgAlt} />
                    </a>
                  </Link>
                </div>
              );
            })
            : type === 'scroll'
              ? products.map((product) => {
                return (
                  <div key={product.id} className="keen-slider__slide miniBox">
                    <Link href={product.redirect || ''}>
                      <a>
                        <div className="img">
                          <img src={product.imgSrc} alt={product.imgAlt} />
                        </div>
                        <div className="texts">
                          <span>{product.name}</span>
                          <span>{product.price}</span>
                        </div>
                      </a>
                    </Link>
                  </div>
                );
              })
              : type === 'product' ? '' : ''
          }
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className="dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={`dot${currentSlide === idx ? ' active' : ''}`}
              ></button>
            );
          })}
        </div>
      )}
    </Box>
  );
}

export { Carousel };
