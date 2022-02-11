import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: white;
  border: none;
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.light.primary};
    padding: 9px 19px;
  }
`;

const Input = (props: any) => {
  return <Wrapper {...props} />;
};

export default Input;
