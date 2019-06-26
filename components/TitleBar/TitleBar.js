import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Parser from '../Parser/Parser';

export default class TitleBar extends Component {
  render() {
    return (
      <Nav>
        <SiteIdentity>
          <a title="ACC Home Link" href="http://www.austincc.edu">
            <Parser>{require('../../images/ACC.svg?include')}</Parser>
          </a>

          <SiteTitle>
            <Link href="/">
              <TLED>TLED</TLED>
            </Link>
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
              <Parser>{require('../../images/calendarIcon.svg?include')}</Parser>
            </a>
          </Link>

          <Link href="/#searchForm">
            <a
              style={{ marginRight: '15px' }}
              onClick={e => this.props.toggleSearch(e)}
              aria-controls="searchForm"
              aria-expanded={this.props.searchExpanded}
            >
              <button role="button">
                <Parser>{require('../../images/searchIcon.svg?include')}</Parser>
              </button>
            </a>
          </Link>

          <Button onClick={this.props.toggleDrawer}>
            <Parser>{require('../../images/hamburgerMenu.svg?include')}</Parser>
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

const TLED = styled.a`
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
