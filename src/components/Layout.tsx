import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

interface Props {
  children: ReactNode;
}

const Footer = styled.div`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  text-align: center;
`;

const Layout = ({ children }: Props) => {
  return (
    <>
      {/* <PromoTop /> */}
      {children}
      <Footer>
        <Link to="/regulamin.html">
          <a>Regulamin</a>
        </Link>
        &copy; 2021 by Code Green
      </Footer>
    </>
  );
};

export default Layout;
