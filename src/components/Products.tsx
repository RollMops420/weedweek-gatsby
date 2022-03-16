import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import ArrowLeftIcon from 'assets/icons/arrowleft';
import ArrowRightIcon from 'assets/icons/arrowright';

const Grid = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 0 20px;
  gap: 20px;
  position: relative;
`;

const Wrapper = styled.div`
  flex: 0 1 calc(20%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;
  min-width: 150px;
`;

const ShopName = styled.a`
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 1rem;
  font-weight: bold;
`;

const Image = styled(GatsbyImage)`
  border-radius: 10px;
  background-color: #fff;
  width: 100%;
  height: 400px;
  min-width: 150px;
`;

const Content = styled.div`
  padding: 5px 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Price = styled.h4`
  font-size: 16px;
  margin: 0;
`;

const Name = styled.p`
  font-size: 14px;
  /* text-overflow: ellipsis; */
  max-height: 34px;
  overflow: hidden;
  text-align: justify;
`;

const Buttons = styled.div`
  display: grid;
  ${({ theme }) => theme.mq.l} {
    grid-template-columns: repeat(2, 1fr);
  }
  gap: 5px;
`;

const ContentWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const ContentCarousel = styled.div<any>`
  display: flex;
  gap: 1rem;
  transition: all 250ms linear;
  -ms-overflow-style: none;
  scrollbar-width: none;
  & > * {
    width: calc(100% / ${({ length }) => length});
    flex-shrink: 0;
    flex-grow: 1;
  }
`;

const ArrowLeftWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 25%;
  transform: translate(-25%);
  background-color: rgba(22, 22, 22, 0.7);
  border-radius: 50%;
  display: flex;
  z-index: 10;
`;

const ArrowRightWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 25%;
  transform: translate(-25%);
  background-color: rgba(22, 22, 22, 0.7);
  border-radius: 50%;
  display: flex;
  z-index: 10;
`;

const Button = styled.a<any>`
  text-transform: uppercase;
  padding: 5px 20px;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({
    theme,
    secondary,
  }: {
    theme: any;
    secondary?: boolean;
  }) => (secondary ? theme.four : theme.primary)};
`;

const Products = ({ products = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(200);
  const [show] = useState(width > 500 ? products && products.length : 2);
  const [length, setLength] = useState(products && products.length);

  const [touchPosition, setTouchPosition] = useState(null);

  useEffect(() => {
    if (typeof window !== undefined) setWidth(window.innerWidth);
  });

  useEffect(() => {
    setLength(products.length);
  }, [products]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < length - show) {
        setCurrentIndex((prevState) => prevState + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, length, show]);

  const next = () => {
    if (currentIndex < length - show) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      next();
    }

    if (diff < -5) {
      prev();
    }

    setTouchPosition(null);
  };
  return (
    <Grid>
      {currentIndex > 0 && (
        <ArrowLeftWrapper onClick={prev} className="left-arrow">
          <ArrowLeftIcon />
        </ArrowLeftWrapper>
      )}
      <ContentWrapper
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <ContentCarousel
          style={{
            transform: `translateX(-${
              currentIndex *
              (100 / (width > 500 ? products && products.length : 2))
            }%)`,
          }}
          length={products.length}
        >
          {products.map((node) => {
            const product = node.node;
            return (
              <Wrapper key={product.id}>
                {/* <Link href="https://rollmops.pl/" passHref>
              <ShopName>{product.shopName}</ShopName>
            </Link> */}
                {product.featuredImage &&
                  product.featuredImage.node &&
                  product.featuredImage.node.localFile && (
                    <Image
                      image={getImage(
                        product.featuredImage.node.localFile.childImageSharp
                          .gatsbyImageData
                      )}
                    />
                  )}
                <Content>
                  <Price>{product.details.price} zł</Price>
                  <Name dangerouslySetInnerHTML={{ __html: product.title }} />
                  {product.details.review ? (
                    <Buttons>
                      <Link to={`/${product.details.review.slug}`}>
                        <Button>RECENZJA</Button>
                      </Link>
                      {product.details.shop && (
                        <Button
                          secondary={true}
                          href={product.details.shop}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                        >
                          SKLEP
                        </Button>
                      )}
                    </Buttons>
                  ) : (
                    product.details.shop && (
                      <Button
                        secondary={true}
                        href={product.details.shop}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      >
                        SKLEP
                      </Button>
                    )
                  )}
                </Content>
              </Wrapper>
            );
          })}
        </ContentCarousel>
      </ContentWrapper>
      {currentIndex < length - show && (
        <ArrowRightWrapper onClick={next} className="right-arrow">
          <ArrowRightIcon />
        </ArrowRightWrapper>
      )}
    </Grid>
  );
};

export default Products;
