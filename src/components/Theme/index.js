import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

// import "modern-normalize";
import 'typeface-inter'

import theme from './theme'

export const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:100,200,300,400,500,600,700,800,900');
html { font-family: 'Source Sans Pro', sans-serif; }
@supports (font-variation-settings: normal) {
  html { font-family: 'Source Sans Pro var', sans-serif; }
}
  :root {
    --root-font-size: 16px;
    --font-family: Source Sans Pro;
    --system-ui: Source Sans Pro,apple-system, BlinkMacSystemFont, Segoe UI,
    Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji,
    Segoe UI Symbol;

    /* greys */
    --c-violet: #283aa0;
    --c-white: #fff;
    --c-alabaster: #FBFBFB;
    --c-zircon: #e1e1e1;
    --c-mineshaft: #333333;
    --c-concrete: #f2f2f2;
    --c-jaguar: #2b2b2b;

    /* colors */
    --c-uniswappink: #0B0628;
    --c-ronchi: #F9D94C;
    --c-button: #2f50Ad;
    --c-connected: #27AE60;
    --c-warning-dim: #FF6871;

    /* dynamic theme */
    --c-token: #333333;

    /* text colors */
    --c-text: #2b2b2b;
    --c-text-subtext: #737373;
    --c-text-dim: #aeaeae;
    --c-text-light: #fff;
    --c-text-light-subtext: rgba(255 255, 255, 0.80);
    --c-text-light-dim: rgba(255, 255, 255, 0.60);
  }

  html {
    font-size: var(--root-font-size);
    background-color: ${props => props.theme.colors.alabaster};
    background-image: radial-gradient(55% 55% at 55% 55%,rgb(114 127 255 / 0.15) 0%,rgba(255,255,255,0.05) 100%);
  }

  body {
    margin: 0;
    font-family: ${props => props.theme.fonts.sans};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  a {
  color: rgba(84, 99, 248);
  }
  a:hover{
  color: rgba(54, 68, 214);
  }
  .-transition {
    transition-property: background-color, color;
    transition-timing-function: ease;
    transition-duration: .5s;
  }
`

export const Theme = props => <ThemeProvider theme={theme}>{props.children}</ThemeProvider>

export const Wrapper = ({ children }) => (
  <Theme>
    <>
      <GlobalStyles />
      {children}
    </>
  </Theme>
)

export default Wrapper
