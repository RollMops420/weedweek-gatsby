import React from 'react';
import styled from 'styled-components';

interface Props {
  isOpen: boolean;
  onClick(): void;
}

const StyledHamburger = styled.button`
  /* @media (prefers-color-scheme: dark) { */
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );
  /* }
  @media (prefers-color-scheme: light) {
    background: linear-gradient(to right, ${({ theme }) =>
    theme.light.primary} 0%, ${({ theme }) => theme.light.secondary} 100%);
  } */
  width: 100%;
  height: 100%;
  border-radius: 50%;
  padding: 8px 6px;
  border: none;
  &:focus {
    outline: none;
  }
  width: 32px;
  height: 32px;
  margin: 0 10px;
  z-index: 99;
  ${({ theme }) => theme.mq.l} {
    padding: 16px 13.5px;
    width: 48px;
    height: 48px;
    margin: 0 0 0 10px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const InnerHamburger = styled.div`
  position: relative;
  width: 20px;
  height: 2px;
  /* @media (prefers-color-scheme: dark) { */
  background-color: ${({ theme, isOpen }) =>
    isOpen ? 'transparent' : theme.white};
  /* }
  @media (prefers-color-scheme: light) {
    background-color: ${({ theme, isOpen }) =>
    isOpen ? 'transparent' : theme.light.black};
  } */
  /* background-color: ${({ theme, isOpen }) =>
    isOpen ? 'transparent' : theme.light.black}; */
  transition: background-color 0.15s 0.25s ease-out;

  ::after,
  ::before {
    content: '';
    position: absolute;
    left: 0;
    width: 20px;
    height: 2px;
    /* @media (prefers-color-scheme: dark) { */
    background-color: ${({ theme }) => theme.white};
    /* }
    @media (prefers-color-scheme: light) {
      background-color: ${({ theme }) => theme.light.black};
    } */
    /* background-color: ${({ theme }) => theme.light.black}; */
    transition: transform 0.25s 0.15s ease-in-out;
  }

  ::before {
    top: -6px;
    transform: translateY(
        ${({ isOpen }: { isOpen: boolean }) => (isOpen ? '6px' : '0')}
      )
      rotate(${({ isOpen }) => (isOpen ? '45deg' : '0')});
  }

  ::after {
    top: 6px;
    transform: translateY(${({ isOpen }) => (isOpen ? '-6px' : '0')})
      rotate(${({ isOpen }) => (isOpen ? '-45deg' : '0')});
  }
`;

const Hamburger = ({ isOpen, onClick }: Props) => (
  <StyledHamburger aria-label="Menu" onClick={onClick}>
    <InnerHamburger isOpen={isOpen} />
  </StyledHamburger>
);

export default Hamburger;
