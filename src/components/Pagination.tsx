import React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';

interface Props {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Arrow = styled.div`
  @media (prefers-color-scheme: dark) {
    background: linear-gradient(
      to right bottom,
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.3)
    );
  }
  @media (prefers-color-scheme: light) {
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.3)
    );
  }
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 3s ease;
  &:hover {
    background: linear-gradient(135deg, #3ce898 0%, #4fff7c 100%);
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

const ArrowRight = styled(Arrow)`
  margin-left: auto;
`;

const NumbersWrapper = styled.div`
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  );
  display: flex;
  border-radius: 20px;
  padding: 5px 10px;
`;

const Number = styled.div`
  font-size: 16px;
  margin: 0 5px;
  padding: 5px;
  color: white;
  font-weight: bold;
  &:hover {
    background: linear-gradient(135deg, #3ce898 0%, #4fff7c 100%) !important;
    border-radius: 5px;
    cursor: pointer;
  }
  ${({ selected }: { selected?: boolean }) =>
    selected &&
    `
    background: linear-gradient(135deg,#3CE898 0%,#4FFF7C 100%) !important;
    border-radius: 5px;
  `}
`;

const Pagination = ({ hasPreviousPage, hasNextPage }: Props) => {
  return (
    <Wrapper>
      {hasPreviousPage && (
        <Arrow>
          <StaticImage image="/icons/chevron-left.svg" width={16} height={16} />
        </Arrow>
      )}
      {hasNextPage && (
        <ArrowRight>
          <StaticImage
            image="/icons/chevron-right.svg"
            width={16}
            height={16}
          />
        </ArrowRight>
      )}
    </Wrapper>
  );
};

export default Pagination;
