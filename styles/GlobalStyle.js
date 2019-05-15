import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700,900');

  html, body, #screen {
    min-height: 100%;
  }

  html {
    box-sizing: border-box;
    font-size: 16px;
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
    font-size: 1rem;
    color: ${props => props.theme.black};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    h1 {
        font-family: ${props => props.theme.displayFont};
        font-size: 2rem;
    }

    a {
      color: ${props => props.theme.black};
      text-decoration: none;
    }

    p {
      line-height: 1.6rem;
    }

    img,
    figure {
      max-width: 100%;
    }

    img.alignleft {
      float: left;
      margin: 0 1.5rem 1rem 0;
    }

    img.alignright {
      float: right;
      margin: 0 0 1rem 1.5rem;
    }

    figcaption,
    .wp-caption-text {
      font-size: 0.68rem;
      text-align: right;
      font-style: italic;
      font-style: italic;
      padding: 0.5rem 1rem;
      background: hsl(0, 0%, 30%);
      color: white;
    }

    hr {
      border-bottom-width: 2px;
      border-bottom-color: rgb(26, 82, 118);
      opacity: 0.35;
    }

    main li {
      margin-bottom: 0.6rem;
    }
    /* a:not([href^="/"]) {
      color: greenyellow !important;
    } */

    /* main li:not([role="menuitem"]) {
      margin-bottom: 1.5rem;
    }

    main li.menu-item {
      margin-bottom: 0.6rem;
    } */


  }

`;

export default GlobalStyle;
