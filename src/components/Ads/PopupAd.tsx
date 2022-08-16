import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GatsbyImage, getImage, ImageDataLike, StaticImage } from 'gatsby-plugin-image';
import CloseIcon from 'assets/icons/close';
import useInterval from 'utils/useinterval';
// import CalendarWebM from '../../assets/images/kalendarz-kwadrat.webm';
// import CalendarMP4 from '../../assets/images/kalendarz-kwadrat.mp4';
// import nowyKanalWebM from '../../assets/images/nowykanal.webm';
// import nowyKanalMP4 from '../../assets/images/nowykanal.mp4';

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
  const [bannerVisible, setBanner] = useState(0);
  const [isVisible, setVisible] = useState(false);
  const hrefWithRef = new URL(href);
  hrefWithRef.searchParams.append('utm_source', 'weedweek.pl');

  useEffect(() => {
    const showTimeout = setTimeout(() => {
      let found = localStorage.getItem(`popup-podk-${href}`);
      if (!found) {
        setVisible(true);
        localStorage.setItem(`popup-podk-${href}`, '0');
      }
      if (found && Number(found) < 3) {
        setVisible(true);
        localStorage.setItem(
          `popup-podk-${href}`,
          (Number(found) + 1).toString()
        );
      }
    }, 5000);

    return () => clearTimeout(showTimeout);
  }, []);

  useInterval(() => {
    setBanner((prevState) => (prevState ? 0 : 1));
  }, 6000);

  return (
    <Wrapper visible={isVisible}>
      <CloseWrapper onClick={() => setVisible(false)}>
        <CloseIcon width={48} height={48} />
      </CloseWrapper>
      {bannerVisible === 0 && (
        <a
        href="https://podkarpackaklinikakonopna.pl/?utm_source=weedweek.pl"
        style={{
          display: 'block',
          width: '100%',
          borderRadius: 10,
          overflow: 'hidden',
        }}
        target="blank"
      >
        <StaticImage
          layout="fullWidth"
          src="../../assets/images/klinikapodk.jpg"
          aspectRatio={1}
          alt="420Vape"
        />
      </a>
      )}
      {bannerVisible === 1 && (
        <a
        href="https://podkarpackaklinikakonopna.pl/?utm_source=weedweek.pl"
        style={{
          display: 'block',
          width: '100%',
          borderRadius: 10,
          overflow: 'hidden',
        }}
        target="blank"
      >
        <StaticImage
          layout="fullWidth"
          src="../../assets/images/klinikapodk.jpg"
          aspectRatio={1}
          alt="Podkarpacka Klinika"
        />
      </a>
      )}
      {/* <a target="blank" href="https://www.youtube.com/watch?v=pxxRQX7nyxw">
        <video
          playsInline
          autoPlay
          muted
          loop
          style={{ width: '100%', borderRadius: 10 }}
        >
          <source src={nowyKanalWebM} type="video/webm" />
          <source src={nowyKanalMP4} type="video/mp4" />
        </video>
      </a> */}
    </Wrapper>
  );
};

export default PopupAd;
