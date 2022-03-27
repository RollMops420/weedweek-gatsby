import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  padding-bottom: 31%;
  &:hover {
    cursor: pointer;
  }
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const Letter = styled.span`
  font-size: 48px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Poppins';
  font-weight: bold;
`;

const GifAd = ({ source, href }: { source: string; href: string }) => {
  console.log(source, href);

  return (
    <a href={href} target="blank">
      <Wrapper>
        <Image src={source} alt="" />
      </Wrapper>
    </a>
  );
};

export default GifAd;
