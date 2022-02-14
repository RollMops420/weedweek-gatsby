import React from 'react';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const Wrapper = styled.div`
  border-radius: 10px;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
  position: relative;
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

const SquareAd = ({ source, href }: { source: string; href: string }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer nofollow">
      {/* <Wrapper> */}
      <Image image={getImage(source)} alt="" />
      {/* <Letter>B</Letter> */}
      {/* </Wrapper> */}
    </a>
  );
};

export default SquareAd;
