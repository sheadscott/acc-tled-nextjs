import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Link from 'next/link';
import Meta from './Meta';
import Header from './Header';
import GlobalStyle from '../styles/GlobalStyle';
import theme from '../theme';

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <GlobalStyle />
          <Header navData={this.props.navData} />
          <StyledMain>{this.props.children}</StyledMain>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

const StyledMain = styled.main`
  margin: 0 auto;
  padding: 2rem;
  max-width: ${props => props.theme.maxWidth};
  min-height: 100%;

  img {
    max-width: 100%;
  }
`;
