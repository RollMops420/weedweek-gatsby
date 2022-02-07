import { createGlobalStyle } from 'styled-components';

const themeConst = {
  font: {
    mobile: {
      h2: '2.1rem',
    },
    desktop: {
      h2: '2.4rem',
    },
    size: {
      xxs: '.9rem',
      xs: '1.4rem',
      s: '1.8rem',
      m: '2.4rem',
      ml: '3.6rem',
      l: '4.2rem',
      xl: '7.2rem',
      xxl: '9.4rem',
    },
    family: {
      neuville: 'Neuville, sans-serif',
      calibre: 'Calibre, sans-serif',
      sourcesans: 'Source Sans Pro',
    },
  },
  mq: {
    m: `@media (min-width: 768px)`,
    l: `@media (min-width: 992px)`,
    xl: `@media (min-width: 1200px)`,
    xxl: `@media(min-width: 1800px)`,
  },
};

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    /* -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; */
  }

  html {
    font-size: 62.5%;
    overflow-x: hidden;
  }

  body {
    background: ${({ theme }: any) => theme.background};
    color: ${({ theme }) => theme.text};
    margin: 0;
    font-size: 1.6rem;
    min-height: 100vh;
    font-family: 'Rubik', sans-serif;
  }

  a {
    color: unset;
    text-decoration: none;
    font-family: 'Rubik', sans-serif;
  }

  h1 {
    font-family: 'Rubik', sans-serif;
    font-weight: 800;
  }

  h2, h3, h4, h5 {
    font-family: 'Rubik', sans-serif;
    font-weight: 700;
    margin: 10px 0;
  }

  h2 {
    font-size: ${({ theme }) => theme.font.mobile.h2};
    margin: 0;
    padding: 30px 0;
    /* border-bottom: 1px solid ${({ theme }) => theme.border}; */
  }

  p {
    font-family: 'Rubik', sans-serif;
    font-size: 1.6rem;
  }

  ${themeConst.mq.l} {
    h1 {
      font-size: 4rem;
    }

    h2 {
      font-size: ${({ theme }) => theme.font.desktop.h2};
    }

    h3 {
      font-size: ${themeConst.font.size.m};
    }

    h4, h5 {
      font-size: ${themeConst.font.size.s};
    }

    p {
      font-size: 18px;
    }
  }

  ul {
    font-family: 'Poppins';
  }

  strong {
    font-family: 'Poppins';
    font-weight: bold;
  }

  em {
    font-family: 'Poppins';
    word-break: break-word;
    word-wrap: break-word;
  }

  a {
    display: block;
  }

  figure {
    margin: 0;
    & iframe {
      max-width: 100%;
      margin: 0 auto;
      display: block;
    }
  }
`;

export default GlobalStyle;
