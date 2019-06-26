import React, { Component } from 'react';
import styled from 'styled-components';
import Meta from './Meta';
import GlobalStyle from '../styles/GlobalStyle';

class Page extends Component {
  render() {
    const { children } = this.props;
    return (
      <StyledPage>
        <Meta />
        <GlobalStyle />
        <StyledMain>{children}</StyledMain>
      </StyledPage>
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
  max-width: 100%;
  min-height: 100%;

  img {
    max-width: 100%;
  }

  a:not(.button) {
    font-weight: 700;
    color: rgb(26, 82, 118);

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;
