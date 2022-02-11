import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';
import CloseIcon from 'assets/icons/close';

interface WrapperProps {
  visible?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  position: fixed;
  bottom: ${({ visible }) => (visible ? '0' : '-100%')};
  left: 50%;
  transform: translateX(-50%);
  z-index: 998;
  width: 100%;
  background-color: white;
  padding: 2rem;
  transition: bottom 1s;
  ${({ theme }) => theme.mq.l} {
    width: 500px;
    left: unset;
    right: 0;
    transform: unset;
  }
`;

const CloseWrapper = styled.div`
  padding: 10px;
  text-align: right;
  padding-top: 0;
  &:hover {
    cursor: pointer;
  }
`;

const Close1 = styled.div`
  background-color: #000;
  transform: rotate(-45deg);
  width: 30px;
  height: 3px;
`;

const Close2 = styled.div`
  background-color: #000;
  transform: rotate(45deg);
  width: 30px;
  height: 3px;
`;

interface Banner {
  source: string;
  href: string;
}

interface Props {
  banners: Banner[];
}

const PopupAd = ({ source, href }: { source: ImageDataLike; href: string }) => {
  const [isVisible, setVisible] = useState(false);
  const hrefWithRef = new URL(href);
  hrefWithRef.searchParams.append('utm_source', 'weedweek.pl');

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      let found = localStorage.getItem(`popup-herbata-${href}`);
      if (!found) {
        setVisible(true);
        localStorage.setItem(`popup-herbata-${href}`, '0');
      }
      if (found && Number(found) < 3) {
        setVisible(true);
        localStorage.setItem(
          `popup-herbata-${href}`,
          (Number(found) + 1).toString()
        );
      }
    }, 5000);

    return () => clearTimeout(showTimeout);
  }, []);

  // useEffect(() => {
  //   const changeInterval = setInterval(() => {
  //     if (bannerVisible !== banners.length - 1) {
  //       setBanner((prevState) => prevState + 1);
  //     } else {
  //       setBanner(0);
  //     }
  //   }, 5000);

  //   return () => clearInterval(changeInterval);
  // });

  return (
    <Wrapper visible={isVisible}>
      <CloseWrapper onClick={() => setVisible(false)}>
        <CloseIcon width={48} height={48} />
      </CloseWrapper>
      <a
        href={hrefWithRef.href}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <GatsbyImage image={getImage(source)} alt="" />
      </a>
    </Wrapper>
  );
};

export default PopupAd;
