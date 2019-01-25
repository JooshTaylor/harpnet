import { createGlobalStyle } from "styled-components";
import colours from "./colours";

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.6rem;
    color: ${colours["text"]};
    font-family: 'Lato', sans-serif;
  }
  a {
    text-decoration: none;
    color: ${colours["text"]};
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyles;
