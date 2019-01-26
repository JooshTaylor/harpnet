import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 62.5%;
    background-color: ${props => props.theme.white};
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.6rem;
    color: ${props => props.theme.text};
    font-family: 'Lato', sans-serif;
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.text};
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`

export default GlobalStyles
