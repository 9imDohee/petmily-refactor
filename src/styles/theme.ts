/* eslint-disable import/named */
import { css } from 'styled-components';
import { DefaultTheme } from 'styled-components';

const colors = {
  black: '#000000',
  white: '#ffffff',
  mainBlue: '#279EFF',
  subBlue: '#1D8CE7',
  darkBlue: '#096DBE',
  skyBlue: '#36313D',
  paleBlue: '#9AC5F4',
  red: '#FF6161',
};

const lineColors = {
  coolGray90: '#F5F6F8',
  coolGray80: '#DEE2E9',
};
const fontSize = {
  s12h18: css`
    font-size: 12px;
    line-height: 18px;
  `,
  s14h21: css`
    font-size: 14px;
    line-height: 21px;
  `,
  s16h24: css`
    font-size: 16px;
    line-height: 24px;
  `,
  s18h27: css`
    font-size: 18px;
    line-height: 27px;
  `,
  s20h30: css`
    font-size: 20px;
    line-height: 30px;
  `,
};
const fontWeights = {
  light: 400,
  normal: 500,
  bold: 600,
  extrabold: 700,
};
const shadow = {
  onlyBottom: '0px 4px 4px rgba(39,44, 86, 0.06)',
  dp01: '0px 10px 34px 0px rgba(39, 44, 86, 0.08)',
  dp02: '0px 4px 12px 0px rgba(39, 44, 86, 0.12)',
  dp03: '0px 12px 60px 0px rgba(39, 44, 86, 0.10)',
  dp04: 'box-shadow: 0px 35px 64px 0px rgba(39, 44, 86, 0.24)',
  inset: '0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset',
};

export const lightTheme: DefaultTheme = {
  colors: colors,
  textColors: {
    gray00: '#1A1A1A',
    gray10: '#2E2E2E',
    gray30: '#595959',
    gray40: '#757575',
    gray50: '#B5B5B5',
    gray60: '#A6A6A6',
    primary: '#000000',
    secondary: '#2E2E2E',
  },
  lineColors: lineColors,
  fontSize: fontSize,
  fontWeights: fontWeights,
  shadow: shadow,
  backgroundColor: { primary: '#ffffff', secondary: '#ffffff' },
};

export const darkTheme: DefaultTheme = {
  colors: colors,
  textColors: {
    gray00: '#1A1A1A',
    gray10: '#2E2E2E',
    gray30: '#595959',
    gray40: '#757575',
    gray50: '#B5B5B5',
    gray60: '#A6A6A6',
    primary: '#ffffff',
    secondary: '#D9D9D9',
  },
  lineColors: lineColors,
  fontSize: fontSize,
  fontWeights: fontWeights,
  shadow: shadow,
  backgroundColor: { primary: '#2E2E2E', secondary: '#737373' },
};

export const theme = {
  lightTheme,
  darkTheme,
};
