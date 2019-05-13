import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

export default class TitleBar extends Component {
  render() {
    return (
      <Nav>
        <SiteIdentity>
          <a title="ACC Home Link" href="http://www.austincc.edu">
            <img src={require('../../images/ACC.svg')} alt="Home" />
          </a>

          <SiteTitle>
            <TLED href="/">TLED</TLED>
          </SiteTitle>
        </SiteIdentity>

        <TitleBarNav>
          {this.props.titleBarItems.map(item => {
            // Internal links using React Router
            if (item.type === 'post_type') {
              return (
                <Link key={item.id} href={`/${item.object_slug}`}>
                  <a>{item.title}</a>
                </Link>
              );
            }

            // external links
            return (
              <a key={item.id} href={item.url}>
                {item.title}
              </a>
            );
          })}
        </TitleBarNav>

        <TitleBarControls>
          <Link href="/calendar">
            <a title="Link to Calendar Page" style={{ marginRight: '15px' }}>
              <img src={require('../../images/calendarIcon.svg')} alt="Calendar" />
            </a>
          </Link>

          <Link href="/#searchForm">
            <a
              role="button"
              style={{ marginRight: '15px' }}
              onClick={e => this.props.toggleSearch(e)}
              aria-controls="searchForm"
              aria-expanded={this.props.searchExpanded}
            >
              <img src={require('../../images/searchIcon.svg')} alt="Search" />
            </a>
          </Link>

          <Button onClick={this.props.toggleDrawer}>
            <img src={require('../../images/hamburgerMenu.svg')} alt="Menu" />
          </Button>
        </TitleBarControls>
      </Nav>
    );
  }
}

const Nav = styled.nav`
  display: flex;
  align-items: center;
  font-size: 15px;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  background: #666;
  padding: 10px;
  box-sizing: border-box;
`;

const SiteIdentity = styled.div`
  flex-wrap: nowrap;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 175px;
`;

const TitleBarNav = styled.div`
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  display: none;

  @media (min-width: 800px) {
    display: flex;
  }

  a {
    color: white;
    display: block;
    font-size: 1rem;
    text-decoration: none;
    text-align: center;
    margin: 0 1rem;
    line-height: 1rem;

    @media (min-width: 960px) {
      margin: 0 2rem;
    }

    &:hover {
      text-decoration: underline;
    }
  }
`;

const TitleBarControls = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 175px;
  justify-content: flex-end;

  img {
    width: 24px;
    height: 24px;
  }
`;

const SiteTitle = styled.div`
  font-size: 1.4rem;
  padding: 0 0.5rem;
  border-left: 1px solid white;
  margin-left: 0.25rem;
`;

const TLED = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover,
  &:focus {
    color: white;
    text-decoration: underline;
  }
`;

const Button = styled.button`
  background: transparent;
  border: none;
  display: block;

  @media (min-width: 800px) {
    display: none;
  }
`;
