import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  padding: 10px 0;
  background-color: #ddcba7;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-align: center;
  & p {
    color: #ff2d19;
  }
  ${({ theme }) => theme.mq.l} {
    letter-spacing: 1px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const PromoTop = () => {
  return (
    <a href="https://rollmops.pl/?ref=weedweek" target="_blank" rel="noopener">
      <Wrapper>
        <p>
          Kup prezent w sklepie RollMops z kodem WEEDWEEKPL i zyskaj 10% rabatu
          🎁
        </p>
      </Wrapper>
    </a>
  );
};

export default PromoTop;
