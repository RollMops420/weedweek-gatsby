import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
  id?: string;
  title?: string;
  maxHeight?: boolean;
}

const Wrapper = styled.section`
  background: linear-gradient(
    to right bottom,
    ${({ theme }) => theme.glassFrom},
    ${({ theme }) => theme.glassTo}
  );
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  ${({ maxHeight }: { maxHeight: boolean }) =>
    maxHeight &&
    `
    max-height: 50vh;
  `}
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  ${({ theme }) => theme.mq.l} {
    border-radius: 30px;
    margin-top: 0;
    padding: 30px;
  }
`;

const Heading = styled.h4`
  margin: 0;
  margin-bottom: 10px;
`;

const Content = styled.div`
  height: 100%;
`;

const Box = ({ children, id, title, maxHeight = false }: Props) => {
  return (
    <Wrapper id={id} maxHeight={maxHeight}>
      {title && <Heading>{title}</Heading>}
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default Box;
