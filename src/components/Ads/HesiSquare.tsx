import { StaticImage } from 'gatsby-plugin-image';
import React, { useState } from 'react';
import styled from 'styled-components';

const StyledA = styled.a`
  border-radius: 10px;
  overflow: hidden;
  margin: 0 auto;
`;

const HesiSquare = () => {
  const [visible] = useState(Math.floor(Math.random() * 3));

  if (visible === 0)
    return (
      <StyledA>
        <StaticImage src="../../assets/images/hesisquare1.png" alt="Hesi" />
      </StyledA>
    );

  if (visible === 1)
    return (
      <StyledA>
        <StaticImage src="../../assets/images/hesisquare2.png" alt="Hesi" />
      </StyledA>
    );

  if (visible === 2)
    return (
      <StyledA>
        <StaticImage src="../../assets/images/hesisquare3.png" alt="Hesi" />
      </StyledA>
    );
};

export default HesiSquare;
