import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  /* max-width: 512px; */
  margin: 20px auto;
  /* padding: 0 20px; */
  text-align: center;
  max-width: 1200px;
  ${({ square }: { square: boolean }) =>
    square &&
    `
    max-width: 256px;
  `}
`;

export default function AdWrapper(props: any) {
  return <Wrapper {...props} />;
}
