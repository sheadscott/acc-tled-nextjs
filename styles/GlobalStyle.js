import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700,900');

  html, body, #screen {
    min-height: 100%;
  }

  html {
    box-sizing: border-box;
    font-size: 10px;
    width: 100%;
    overflow-x: hidden;
  }

  *, *::before, *::after {
      box-sizing: inherit;
  }

  body {
    background: white;
    padding: 0;
    margin: 0;
    font-family: ${props => props.theme.bodyFont};
    font-size: 1.6rem;
    color: ${props => props.theme.black};

    h1 {
        font-family: ${props => props.theme.displayFont};
        font-size: 5.5rem;
        text-align: center;
    }

    a {
      color: ${props => props.theme.black};
      text-decoration: none;
    }
  }

`;

export default GlobalStyle;
