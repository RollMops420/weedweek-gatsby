import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
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

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 100%;
`;

const CloseWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  z-index: 999;
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

const PopupAd = ({ banners }: Props) => {
  const [bannerVisible, setBanner] = useState(0);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      let found = localStorage.getItem(`popup-herbata-${banners[0].href}`);
      if (!found) {
        setVisible(true);
        localStorage.setItem(`popup-herbata-${banners[0].href}`, '0');
      }
      if (found && Number(found) < 3) {
        setVisible(true);
        localStorage.setItem(
          `popup-herbata-${banners[0].href}`,
          (Number(found) + 1).toString(),
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
        href={`${banners[bannerVisible].href}?utm_source=weedweek.pl`}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        <ImageWrapper>
          <Image
            src={banners[bannerVisible].source.replace(
              'https://res.cloudinary.com/weedweek/images/f_auto,q_60',
              '',
            )}
            alt="Reklama"
            layout="fill"
            objectFit="cover"
            sizes="(max-width: 500px) 480px,(max-width: 991px) 991px, 768px"
            priority
            loader={
              banners[bannerVisible].source.includes('admin.')
                ? ({ src }) => src
                : undefined
            }
          />
        </ImageWrapper>
      </a>
    </Wrapper>
  );
};

export default PopupAd;
