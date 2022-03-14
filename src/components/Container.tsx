import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  full?: boolean;
  top?: boolean;
  horizontal?: boolean;
}

const Wrapper = styled.div<any>`
  ${({ top }) =>
    top &&
    `
  margin-top: 3.5rem !important;
`};
  ${({ horizontal }) =>
    horizontal &&
    `
margin-left: 10px !important;
margin-right: 10px !important;
`};
  max-width: 100%;
  ${({ theme }) => theme.mq.l} {
    padding: ${({ full }) => (full ? '0' : '0 20px')};
  }
  ${({ theme }) => theme.mq.xl} {
    max-width: ${({ full }) => (full ? 'unset' : '1200px')};
    margin: 0 auto;
    padding: 0;
  }
`;

const Container = ({ children, full, top, horizontal }: Props) => {
  return (
    <Wrapper full={full} top={top} horizontal={horizontal}>
      {children}
    </Wrapper>
  );
};

export default Container;
