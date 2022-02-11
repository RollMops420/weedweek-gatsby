import React, { forwardRef } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Wrapper = styled.div<any>`
  background-color: ${({ theme }) => theme.box};
  padding: 10px;
  margin-bottom: 20px;
  position: relative;
  ${({ theme }) => theme.mq.l} {
    padding: 20px;
  }
`;

const Title = styled.h2`
  padding: 0;
  padding-bottom: 20px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledLink = styled.a`
  &:hover {
    color: ${({ theme }) => theme.secondary};
  }
`;

const InnerWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div<any>`
  ${({ theme }) => theme.mq.m} {
    display: ${({ full }) => (full ? 'block' : 'grid')};
    grid-template-columns: 2fr 1fr;
    grid-gap: 20px;
  }
`;

const Section = forwardRef((props: any, ref: any) => (
  <Wrapper ref={ref} {...props}>
    <InnerWrapper>
      <TitleWrapper>
        {props.title && <Title>{props.title}</Title>}
        {props.showMore && (
          <Link to={props.showMore}>
            <StyledLink>Zobacz więcej</StyledLink>
          </Link>
        )}
      </TitleWrapper>
      <Grid small={props.small} full={props.full}>
        {props.children}
      </Grid>
    </InnerWrapper>
  </Wrapper>
));

export default Section;
