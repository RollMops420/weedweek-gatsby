import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  full?: boolean;
}

const Wrapper = styled.div<any>`
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

const Container = ({ children, full }: Props) => {
  return <Wrapper full={full}>{children}</Wrapper>;
};

export default Container;
