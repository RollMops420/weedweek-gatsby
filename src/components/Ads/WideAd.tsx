import React from 'react';
import styled from 'styled-components';
import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image';

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  padding-bottom: 27%;
  & img {
    border-radius: 10px;
  }
  /* background-color: yellow; */
  &:hover {
    cursor: pointer;
  }
`;

const Image = styled(GatsbyImage)`
  width: 100%;
  border-radius: 10px;
  & img {
    border-radius: 10px;
  }
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

const WideAd = ({ source, href }: { source: ImageDataLike; href: string }) => {
  return (
    <a href={href} target="blank">
      {/* <Wrapper> */}
      <Image image={getImage(source)} alt="" />
      {/* </Wrapper> */}
    </a>
  );
};

export default WideAd;
