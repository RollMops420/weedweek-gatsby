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

export const darkTheme = {
  primary: '#1e744c',
  secondary: '#28803e',
  third: 'hsl(69, 98%, 60%)',
  four: 'hsl(69, 98%, 45%)',
  white: 'hsl(0, 0%, 100%)',
  grey: 'hsl(0, 0%, 95%)',
  darkgrey: 'hsl(0, 0%, 70%)',
  black: 'hsl(0, 0%, 0%)',
  background: 'rgb(27,27,27)',
  border: '#d9d9d9',
  text: '#d9d9d9',
  box: '#222',
  glassFrom: 'rgba(30, 116, 76, .7)',
  glassTo: 'rgba(40, 128, 62, .3)',
  ...themeConst,
};

export const lightTheme = {
  primary: '#30ba7a',
  secondary: '#4FFF7C',
  third: 'hsl(69, 98%, 60%)',
  four: 'hsl(69, 98%, 45%)',
  white: 'hsl(0, 0%, 100%)',
  grey: 'hsl(0, 0%, 95%)',
  darkgrey: 'hsl(0, 0%, 50%)',
  black: 'hsl(0, 0%, 0%)',
  background: '#eee',
  border: '#353535',
  text: '#000',
  box: '#fff',
  glassFrom: 'rgba(60, 232, 152, .9)',
  glassTo: 'rgba(48, 186, 122, .4)',
  ...themeConst,
};

export default {
  light: {
    primary: '#3CE898',
    secondary: '#4FFF7C',
    third: 'hsl(69, 98%, 60%)',
    four: 'hsl(69, 98%, 45%)',
    white: 'hsl(0, 0%, 100%)',
    grey: 'hsl(0, 0%, 95%)',
    darkgrey: 'hsl(0, 0%, 70%)',
    black: 'hsl(0, 0%, 0%)',
    heading: '#30405b',
    glassFrom: 'rgba(60, 232, 152, .7)',
    glassTo: 'rgba(79, 255, 124, .3)',
  },
  dark: {
    primary: '#1e744c',
    secondary: '#28803e',
    white: 'hsl(0, 0%, 100%)',
    grey: 'hsl(0, 0%, 95%)',
    darkgrey: 'hsl(0, 0%, 70%)',
    black: 'hsl(0, 0%, 0%)',
    heading: 'hsl(0, 0%, 100%)',
    glassFrom: 'rgba(30, 116, 76, .7)',
    glassTo: 'rgba(40, 128, 62, .3)',
  },
  font: {
    size: {
      xxs: '.9rem',
      xs: '1.4rem',
      s: '1.8rem',
      m: '2.6rem',
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