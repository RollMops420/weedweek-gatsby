import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

interface Props {
  children: ReactNode;
  style?: object;
  slug: string;
}

const StyledLink = styled.a`
  display: inline-block;
`;

const Wrapper = styled.div`
  /* @media (prefers-color-scheme: dark) { */
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );
  color: white;
  /* }
  @media (prefers-color-scheme: light) {
    background: linear-gradient(to right, ${({ theme }) =>
    theme.light.primary} 0%, ${({ theme }) => theme.light.secondary} 100%);
    color: black;
  } */
  display: inline-block;
  padding: 7px 15px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 1.3rem;
  &:hover {
    cursor: pointer;
  }
`;

const Category = (props: Props) => (
  <Link to={`/category/${props.slug}`}>
    <Wrapper {...props} />
  </Link>
);

export default Category;
