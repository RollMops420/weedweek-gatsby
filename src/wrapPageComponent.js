import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'assets/GlobalStyle';
import { darkTheme, lightTheme } from 'assets/theme';
import Layout from 'components/Layout';
import Header from 'components/Header/Header';

export const PageComponent = ({ children, props }) => {
  const [theme, selectTheme] = useState('light');

  useEffect(() => {
    const selectedTheme = localStorage.getItem('theme');
    if (selectedTheme) {
      selectTheme(selectedTheme);
    }
  }, []);

  const setTheme = (newTheme) => {
    localStorage.setItem('theme', newTheme);
    selectTheme(newTheme);
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Layout {...props}>
        <Header
          // categories={pageProps.categories ? pageProps.categories.edges : []}
          categories={[]}
          theme={theme}
          setTheme={setTheme}
        />
        {children}
      </Layout>
    </ThemeProvider>
  );
};
