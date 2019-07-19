import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Container } from '../Grid/Grid';
import Parser from '../Parser/Parser';
// import { A } from '../Elements/Elements';
// import decode from "unescape";

import Dropdown from '../Dropdown/index';
import { siteUrl } from '../../config';

/*
  This component should go under the title bar
  according to the comp is has menu items like: about, faculty support, champions of teaching, etc
  it should be present on every page
  will include dropdowns, with one open at a time
  open / closed state is managed here in the expanded array [true, false, false]
  the wrapper container has an onclick handler to act like a universal cancel, closing all menus
*/

export default class SecondaryNav extends Component {
  render() {
    return (
      <Wrapper
        onClick={this.props.cancelSubMenuState}
        className={this.props.subMenuState.includes(true) ? 'expanded' : null}
      >
        <Container as="div">
          <DropdownMenu
            data={this.props.secondaryNavItems}
            renderLink={data => (
              <Link href={data.url.replace(`${siteUrl}/`, '/')}>
                <a
                  data={data.type === 'post_type' ? data : null}
                  className="iw-dropdown__menuLink"
                >
                  <Parser>{data.title}</Parser>
                </a>
              </Link>
            )}
            renderChildren={(items, toggleMenu, focusElement, blurElement) =>
              items.map(child => {
                // menu item has children
                if (child.children) {
                  return (
                    <ul key={child.id} className="parentList">
                      <li>
                        <ListHeading>{child.title}</ListHeading>
                        <ul className="childList">
                          {child.children.map(childLink => (
                            <li key={childLink.id} className="iw-dropdown__subItem">
                              <Link href={childLink.url.replace(`${siteUrl}/`, '/')}>
                                {/* <Link href={childLink.type === 'custom' ? childLink.url : childLink.url}> */}
                                <a
                                  data={childLink.type === 'post_type' ? childLink : null}
                                  className="iw-dropdown__subLink"
                                  onFocus={() => focusElement()}
                                  onBlur={async () => {
                                    const temp = await blurElement();
                                    if (temp.length === 0) {
                                      toggleMenu();
                                    }
                                  }}
                                >
                                  <Parser>{childLink.title}</Parser>
                                </a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  );
                }

                // menu item is a single link
                return (
                  <li key={child.id} className="iw-dropdown__subItem">
                    <Link href={child.type === 'custom' ? child.url : child.url}>
                      <a
                        data={child.type === 'post_type' ? child : null}
                        className="iw-dropdown__subLink"
                        onFocus={() => focusElement()}
                        onBlur={async () => {
                          const temp = await blurElement();
                          if (temp.length === 0) {
                            toggleMenu();
                          }
                        }}
                      >
                        <Parser>{child.title}</Parser>
                      </a>
                    </Link>
                  </li>
                );
              })
            }
          />
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background: #133952;
  position: relative;
  display: none;

  &.expanded:before {
    content: '';
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    // background: pink;
  }

  @media (min-width: 800px) {
    display: block;
  }
`;

const DropdownMenu = styled(Dropdown)`
  margin: 0 -0.5rem;
  list-style: none;
  display: flex;
  flex-direction: column;

  @media (min-width: 800px) {
    flex-direction: row;
    padding: 0;
    justify-content: center;
  }

  ul.parentList {
    list-style: none;
    margin: 0 0 3rem;
    break-inside: avoid;
  }

  ul.childList {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .iw-dropdown__menu {
    z-index: 9999;
  }
  .iw-dropdown__menuItem {
    margin: 0 0.5rem;
  }

  .iw-dropdown__menuLink,
  .iw-dropdown__menuToggle {
    background: transparent;
    border: none;
    font-size: 1rem;
    display: block;
    color: #f1ebab;
    text-decoration: none;
    padding: 0.5rem 1rem;
    text-transform: uppercase;
    box-sizing: border-box;
    height: 100%;
    line-height: 1em;
    text-align: center;
    @media (min-width: 800px) {
      padding: 1rem;
    }
  }

  .iw-dropdown__menuLink:hover,
  .iw-dropdown__menuLink:focus,
  .iw-dropdown__menuLink:active,
  .iw-dropdown__menuToggle:hover,
  .iw-dropdown__menuToggle:focus,
  .iw-dropdown__menuToggle:active,
  .iw-dropdown__menuToggle.active {
    color: white;
    background: #698da4;
  }

  .iw-dropdown__menuToggle {
  }
  .iw-dropdown__submenuWrapper {
    background: #b7c9d2;
    width: 100%;
    padding: 2rem;

    &[aria-expanded='true'] {
      left: 0;
    }
  }
  .iw-dropdown__submenu {
    // column-gap: 2rem;
    // columns: 5
    margin: 0 auto;
    max-width: 75em;
    padding: 0 1rem;
    display: flex;
    justify-content: center;

    & ul:not(:last-child) {
      margin-right: 2rem !important;
    }
  }
  .iw-dropdown__subItem {
    margin-bottom: 1rem;
    position: relative;
    line-height: 1.3rem;

    &:before {
      content: '•';
      display: block;
      position: absolute;
      left: -0.75rem;
      top: -1px;
      color: #153b53;
    }
  }
  .iw-dropdown__subLink {
    color: #4c4d4f;
    &:hover {
      color: #103147;
      text-decoration: underline;
    }
  }
`;

const ListHeading = styled.div`
  // color: #153b53;
  // color: #4c4d4f;
  color: #1d1d1d;
  font-weight: 700;
  margin-bottom: 1rem;
  text-transform: uppercase;
  line-height: 1.3rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #1d1d1d;
`;
