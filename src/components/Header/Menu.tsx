import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Button from 'components/Button';
import ShoppingSVG from '../../assets/icons/shopping-bag.svg';
import ArrowSVG from '../../assets/icons/arrow-downe.svg';
import FacebookSVG from '../../assets/icons/facebook.svg';
import InstagramSVG from '../../assets/icons/instagram.svg';
import YoutubeSVG from '../../assets/icons/youtube.svg';

const StyledMenu = styled.div`
  overflow: scroll;
  /* @media (prefers-color-scheme: dark) { */
  background: black;
  color: white;
  /* }
  @media (prefers-color-scheme: light) {
    background: white;
    color: black;
  } */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  z-index: 2;
  transform: translateX(
    ${({ isOpen }: { isOpen: boolean }) => (isOpen ? '0' : '100%')}
  );
  transition: transform 0.25s ease-in-out;
  padding: 30px;
  padding-top: 140px;
  ${({ theme }) => theme.mq.l} {
    justify-content: flex-start;
    width: 300px;
    right: 0;
    left: unset;
    transform: translateX(${({ isOpen }) => (isOpen ? '0' : '150%')});
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }
`;

const MenuLinksWrapper = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const MenuLink = styled.span`
  /* @media (prefers-color-scheme: dark) {
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );
  color: white;
  /* }
  @media (prefers-color-scheme: light) {
    background: linear-gradient(to right, ${({ theme }) =>
    theme.primary} 0%, ${({ theme }) => theme.secondary} 100%);
    color: black;
  } */
  /* border-radius: 3px;
  text-align: center;
  padding: 10px 0;
  margin: 20px 0 0 0;
  list-style: none;
  font-weight: bold;
  opacity: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? '1' : '0')};
  transition: opacity 0.25s 0.2s ease-in-out;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center; */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  padding: 10px;
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.black};

  :hover {
    color: ${({ theme }) => theme.darkgrey};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  border-radius: 3px;
  border: none;
  padding: 10px 5px;
  color: ${({ theme }) => theme.black};
  font-family: 'Poppins';
  font-size: 16px;
  border-bottom: 2px solid black;
  transition: 0.3s ease;
  :focus {
    outline: none;
    border-bottom: 3px solid ${({ theme }) => theme.secondary};
    padding: 10px 5px 7px 5px;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 1rem;
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
    theme.primary} 0%, ${({ theme }) => theme.secondary} 100%);
    color: black;
  } */
`;

const IconWrapper = styled.div`
  margin-left: 10px;
  display: inline-block;
`;

const ShoppingIcon = styled(ShoppingSVG)`
  height: 16px;
`;

const ArrowIcon = styled(ArrowSVG)`
  display: inline-block;
  height: 16px;
`;

const Dropdown = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  padding: 10px;
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`;

const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  /* @media (prefers-color-scheme: dark) { */
  & path {
    fill: #fff;
  }
  /* }
  @media (prefers-color-scheme: light) {
    & path {
      fill: #000;
    }
  } */
`;

const FacebookIcon = styled(FacebookSVG)`
  margin: 0 5px;
  height: 24px;
  position: relative;
  ${({ theme }) => theme.mq.l} {
    height: 28px;
    margin: 0 10px;
  }
`;

const InstagramIcon = styled(InstagramSVG)`
  margin: 0 5px;
  height: 24px;
  position: relative;
  ${({ theme }) => theme.mq.l} {
    height: 28px;
    margin: 0 10px;
  }
`;

const YoutubeIcon = styled(YoutubeSVG)`
  margin: 0 5px;
  width: 24px;
  height: 24px;
  position: relative;
  ${({ theme }) => theme.mq.l} {
    width: 28px;
    height: 28px;
    margin: 0 10px;
  }
`;

interface Props {
  isOpen: boolean;
  onClick(): void;
}

const Menu = ({ isOpen, onClick }: Props) => {
  const [showDropdown, setDropdown] = useState(false);
  const [width, setWidth] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <StyledMenu isOpen={isOpen}>
      <form>
        <label>
          <SearchInput
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Wyszukaj"
          />
        </label>
        <Link href={`/search?query=${searchQuery}`}>
          <StyledButton onClick={onClick}>Szukaj</StyledButton>
        </Link>
      </form>
      <MenuLinksWrapper>
        <Dropdown onClick={() => setDropdown(!showDropdown)}>
          Kategorie <ArrowIcon />
        </Dropdown>
        {showDropdown && (
          <>
            <MenuLink onClick={onClick} isOpen={isOpen}>
              <StyledLink href="/category/youtube">
                <a>YouTube</a>
              </StyledLink>
            </MenuLink>
            <MenuLink onClick={onClick} isOpen={isOpen}>
              <StyledLink href="/category/medyczna-marihuana">
                <a>Medyczna Marihuana</a>
              </StyledLink>
            </MenuLink>
            <MenuLink onClick={onClick} isOpen={isOpen}>
              <StyledLink href="/category/marihuana">
                <a>Marihuana</a>
              </StyledLink>
            </MenuLink>
            <MenuLink onClick={onClick} isOpen={isOpen}>
              <StyledLink href="/category/kronika-kryminalna">
                <a>Kronika Kryminalna</a>
              </StyledLink>
            </MenuLink>
            <MenuLink onClick={onClick} isOpen={isOpen}>
              <StyledLink href="/category/polska">
                <a>Polska</a>
              </StyledLink>
            </MenuLink>
            <MenuLink onClick={onClick} isOpen={isOpen}>
              <StyledLink href="/category/recenzje">
                <a>Recenzje</a>
              </StyledLink>
            </MenuLink>
            <MenuLink onClick={onClick} isOpen={isOpen}>
              <StyledLink href="/category/zdrowie">
                <a>Zdrowie</a>
              </StyledLink>
            </MenuLink>
          </>
        )}
        <MenuLink onClick={onClick} isOpen={isOpen}>
          <StyledLink href="/discounts">
            <a>Rabaty</a>
          </StyledLink>
        </MenuLink>
        <MenuLink onClick={onClick} isOpen={isOpen}>
          <a href="https://rollmops.pl/?utm_source=weedweek.pl">
            SKLEP
            <IconWrapper>
              <ShoppingIcon />
            </IconWrapper>
          </a>
        </MenuLink>
        <MenuLink onClick={onClick} isOpen={isOpen}>
          <a href="https://app.rollmops.pl/">Aplikacja</a>
        </MenuLink>
        <MenuLink onClick={onClick} isOpen={isOpen}>
          <StyledLink href="/contact">
            <a>Kontakt</a>
          </StyledLink>
        </MenuLink>
      </MenuLinksWrapper>
      <div style={{ display: 'flex' }}>
        <IconLink
          href="https://www.facebook.com/WeedWeekCN/"
          target="_blank"
          rel="noopener"
        >
          <FacebookIcon />
        </IconLink>
        <IconLink
          href="https://www.instagram.com/weedweek420/"
          target="_blank"
          rel="noopener"
        >
          <InstagramIcon />
        </IconLink>
        <IconLink
          href="https://www.youtube.com/channel/UC79An8CkxGYfREOm00ihWzw"
          target="_blank"
          rel="noopener"
        >
          <YoutubeIcon />
        </IconLink>
      </div>
    </StyledMenu>
  );
};

export default Menu;
