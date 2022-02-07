import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import Hamburger from './Hamburger';
import Menu from './Menu';
import ShoppingSVG from '../../assets/icons/shopping-bag.svg';
import CannabisLandSvg from '../../assets/icons/cannabisland.svg';
import { ICategory } from 'types/types';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.primary};
  border-bottom: 1px solid ${({ theme }) => theme.background};
  content-visbility: auto;
  contain-intrinsic-size: 0 68px;
  z-index: 2;
  position: sticky;
  top: 0;
  width: 100%;
  ${({ theme }) => theme.mq.l} {
    contain-intrinsic-size: 0 84px;
  }
`;

const InnerWrapper = styled.div`
  position: relative;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.mq.l} {
    padding: 5px 30px;
  }
  align-items: center;
  z-index: 2;
`;

const Logo = styled.div`
  width: 52px;
  height: 52px;
  position: relative;
  ${({ theme }) => theme.mq.l} {
    width: 68px;
    height: 68px;
  }
`;

const MenuItem = styled.a`
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );
  color: white;
  display: none;
  align-items: center;
  padding: 10px 20px;
  font-weight: bold;
  font-size: 1.4rem;
  border-radius: 30px;
  margin-left: 15px;
  ${({ theme }) => theme.mq.l} {
    display: flex;
  }
  &:hover {
    cursor: pointer;
  }
`;

const IconWrapper = styled.div`
  margin-left: 10px;
  display: flex;
`;

const ShoppingIcon = styled(ShoppingSVG)`
  width: 21px;
  height: 21px;
`;

const CannabisLand = styled(CannabisLandSvg)`
  width: 150px;
  position: absolute;
  top: 64px;
  left: 20px;
  z-index: 99;
  opacity: 0.91;
  ${({ theme }) => theme.mq.l} {
    width: 175px;
    position: absolute;
    top: unset;
    bottom: -27px;
    left: 35px;
  }
`;

const Categories = styled.div`
  display: none;
  margin: 15px 15px 0px 15px;
  overflow-x: scroll;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  ${({ theme }) => theme.mq.m} {
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
  }
  ${({ theme }) => theme.mq.l} {
    display: flex;
  }
`;

const CategoriesMobile = styled.div`
  display: flex;
  margin: 15px 15px 0px 15px;
  overflow-x: scroll;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  ${({ theme }) => theme.mq.m} {
    max-width: 768px;
    margin-left: auto;
    margin-right: auto;
  }
  ${({ theme }) => theme.mq.l} {
    display: none;
  }
`;

const Category = styled.a`
  color: ${({ theme }) => theme.grey};
  padding: 20px 0;
  margin-right: 20px;
  font-size: 14px;
  font-weight: 700;
`;

const CheckBoxWrapper = styled.div`
  position: relative;
  margin-left: 20px;
  ${({ theme }) => theme.mq.l} {
    margin-left: 10px;
    margin-top: 28px;
  }
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: ${({ theme }) => theme.four};
    &::after {
      content: '';
      background: ${({ theme }) => theme.primary};
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
`;

const Header = ({
  categories,
  theme,
  setTheme,
}: {
  categories: ICategory[];
  theme: string;
  setTheme: any;
}) => {
  const [isMenuOpen, setMenuState] = useState(false);

  return (
    <Wrapper>
      <InnerWrapper>
        <div style={{ display: 'flex' }}>
          <Link href="/">
            <a>
              <Logo>
                <Image
                  src="v1627901714/logo/logo.png?_i=AA"
                  alt="WeedWeek"
                  layout="fill"
                  sizes="144px"
                  priority
                />
              </Logo>
            </a>
          </Link>
          <CannabisLand />
          <CheckBoxWrapper>
            <CheckBox
              id="checkbox"
              type="checkbox"
              checked={theme === 'dark'}
              onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
            <CheckBoxLabel htmlFor="checkbox" />
          </CheckBoxWrapper>
        </div>
        <Categories>
          <Link href={`/clinics`} passHref>
            <Category>Kliniki Konopne</Category>
          </Link>
          {categories.map((category, i) =>
            category.node.slug !== 'bez-kategorii' && i !== 0 ? (
              <Link
                key={category.node.slug}
                href={`/category/${category.node.slug}`}
                passHref
              >
                <Category>{category.node.name}</Category>
              </Link>
            ) : null,
          )}
        </Categories>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Hamburger
            isOpen={isMenuOpen}
            onClick={() => setMenuState((prevState) => !prevState)}
          />
        </div>
        <Menu
          isOpen={isMenuOpen}
          onClick={() => setMenuState((prevState) => !prevState)}
        />
      </InnerWrapper>
      <CategoriesMobile>
        <Link href={`/clinics`} passHref>
          <Category>Kliniki Konopne</Category>
        </Link>
        {categories.map((category) =>
          category.node.slug !== 'bez-kategorii' ? (
            <Link
              key={category.node.slug}
              href={`/category/${category.node.slug}`}
              passHref
            >
              <Category>{category.node.name}</Category>
            </Link>
          ) : null,
        )}
      </CategoriesMobile>
    </Wrapper>
  );
};

export default Header;
