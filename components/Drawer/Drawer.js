import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Parser from '../Parser/Parser';
import { siteUrl } from '../../config';

class Drawer extends React.Component {
  state = {
    drawer: 'closed',
  };

  componentWillReceiveProps(newProps) {
    if (newProps.drawerState !== this.props.drawerState) {
      if (newProps.drawerState === true) {
        this.setState({ drawer: 'opening' });

        window.setTimeout(() => {
          this.setState({ drawer: 'open' });
        }, 300);
      }

      if (newProps.drawerState === false) {
        this.setState({ drawer: 'closing' });

        window.setTimeout(() => {
          this.setState({ drawer: 'closed' });
        }, 300);
      }
    }
  }

  handleClick = e => {
    console.log('TARGET: ', e.target);
    e.preventDefault();
    e.stopPropagation();
    const subMenu = e.target.nextSibling; // querySelector("ul");
    const subMenuVisible = subMenu.style.display === 'block';
    if (subMenuVisible) {
      subMenu.style.display = 'none';
    } else {
      subMenu.style.display = 'block';
    }
    console.log('QS: ', e.target.querySelector('span svg'));
    e.target.querySelector('span svg').classList.toggle('expanded');
  };

  render() {
    return (
      <React.Fragment>
        <Aside className={this.state.drawer}>
          <CloseButton onClick={this.props.toggleDrawer}>
            <Parser>{require('../../images/close.svg?include')}</Parser>
            {/* <CloseIcon aria-label="Close Navigation" /> */}
          </CloseButton>
          <Nav>
            <PrimaryList>
              <Primary>
                <Link href="/">
                  <a>TLED Home</a>
                </Link>
              </Primary>

              {this.props.titleBarItems.map(item => {
                // Internal links using React Router
                if (item.type === 'post_type') {
                  return (
                    <Tertiary className="home-links" key={item.id}>
                      <Link href={`/${item.object_slug}`} key={item.id}>
                        <a>
                          <Parser>{item.title}</Parser>
                        </a>
                      </Link>
                    </Tertiary>
                  );
                }

                // external links
                return (
                  <li key={item.id}>
                    <a href={item.url}>
                      <Parser>{item.title}</Parser>
                    </a>
                  </li>
                );
              })}

              {this.props.secondaryNavItems.map((item, index, arr) => {
                if (item.children) {
                  return (
                    <Primary key={item.id} className="hasChildren">
                      <Link href="#">
                        <a onClick={this.handleClick}>
                          <ArrowIcon>
                            <Parser>
                              {require('../../images/arrowDown.svg?include')}
                            </Parser>
                          </ArrowIcon>
                          <Parser>{item.title}</Parser>
                        </a>
                      </Link>
                      <SecondaryList>
                        {item.children.map(child => (
                          <Secondary key={child.id}>
                            <Link href={child.type === 'custom' ? child.url : null}>
                              <a onClick={this.handleClick}>
                                <ArrowIcon className="secondary">
                                  <Parser>
                                    {require('../../images/arrowDown.svg?include')}
                                  </Parser>
                                </ArrowIcon>
                                <Parser>{child.title}</Parser>
                              </a>
                            </Link>
                            {child.children && (
                              <TertiaryList>
                                {child.children.map(grandchild => (
                                  <Tertiary key={grandchild.id}>
                                    <Link
                                      href={
                                        grandchild.type === 'custom'
                                          ? grandchild.url
                                          : grandchild.url.replace(`${siteUrl}/`, '/')
                                      }
                                    >
                                      <a>
                                        <Parser>{grandchild.title}</Parser>
                                      </a>
                                    </Link>
                                  </Tertiary>
                                ))}
                              </TertiaryList>
                            )}
                          </Secondary>
                        ))}
                      </SecondaryList>
                    </Primary>
                  );
                }

                // Internal links using React Router
                if (item.type === 'post_type') {
                  return (
                    <Primary key={item.id} className="no-children">
                      <Link href={item.url.replace(`${siteUrl}/`, '/')}>
                        <a>{item.title}</a>
                      </Link>
                    </Primary>
                  );
                }

                // external links
                return (
                  <li key={item.id}>
                    <a className="parentLink" href={item.url}>
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </PrimaryList>
          </Nav>
        </Aside>
        <CloseDrawer className={this.state.drawer} onClick={this.props.toggleDrawer}>
          <span
            style={{
              position: 'absolute',
              width: 1,
              height: 1,
              overflow: 'hidden',
            }}
          >
            {this.props.drawerState ? 'Open' : 'Close'} Menu
          </span>
        </CloseDrawer>
      </React.Fragment>
    );
  }
}

// const DrawerContext = React.createContext({
//   drawerState: 'closed',
//   toggleDrawer: () => {
//     console.log('drawer is toggled');
//   }
// });

export default Drawer;

const Nav = styled.nav`
  position: relative;
  margin-top: 1rem;

  ul {
    margin: 0;
    // padding: 0;
    list-style: none;
  }

  a:hover {
    color: rgb(26, 82, 118);
    fill: #ccc;
  }

  li.children {
  }
`;

const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const PrimaryList = styled.ul``;

const Primary = styled.li`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.9rem;
  position: relative;
  margin-bottom: 0.5rem;

  // &:before {
  //   width: 2rem;
  // }

  ul {
    display: none;
  }

  & > a {
    display: flex;
    text-indent: 2rem;
    padding: 0.5rem 1rem 0.5rem 0.5rem;
    margin-bottom: 0.5rem;

    &:before {
      content: '';
      display: block;
      width: 2rem;
    }
  }

  &.hasChildren {
    & > a {
      background-color: #efefef;
    }
  }

  .active {
    color: #2286ea;
  }

  &:first-child {
    margin-bottom: 0;
    a {
      margin: 0;
      padding-bottom: 0.5rem;
    }
  }
`;

const SecondaryList = styled.ul`
  padding-left: 2.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const Secondary = styled.li`
  font-size: 0.9rem;
  font-weight: normal;
  position: relative;

  a {
    display: flex;
    margin-bottom: 1rem;
    &:before {
      content: '';
      display: block;
      width: 1.5rem;
    }
  }

  svg {
    left: 0;
  }
`;

const TertiaryList = styled.ul`
  padding-left: 2.5rem;
`;

const Tertiary = styled.li`
  text-transform: none;
  font-size: 0.85rem;

  a {
    display: block;
    &:before {
      width: 0;
    }
  }

  .active {
    color: #2286ea;
  }

  &.home-links {
    padding: 0.5rem 1rem 0.5rem 3.5rem;
  }
`;

const ArrowIcon = styled.span`
  svg {
    pointer-events: none;
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    width: 1.5rem;
    transition: transform 0.3s ease-out;
    // pointer-events: none;
    fill: rgb(26, 82, 118);

    &.secondary {
      width: 1.3em;
      right: -1.06em;
      top: 0.1rem;
    }

    &.expanded {
      transform: scaleY(-1);
    }
  }

  &.secondary svg {
    width: 1.3em;
    right: -1.06em;
    top: 0.1rem;
  }
`;

const Aside = styled.aside`
  right: 0;
  display: none;
  position: fixed;
  background-color: #fff;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  transition: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 999;
  padding: 1rem;
  box-sizing: border-box;
  transform: translateX(100%);
  will-change: transform;
  overflow-y: scroll;
  width: 350px;
  @media (max-width: 374px) {
    width: 300px;
  }

  &.opening {
    display: flex;
    transform: translateX(100%);
  }

  &.open {
    display: flex;
    transform: translateX(0);
    transition-duration: 0.25s;
  }

  &.closing {
    display: flex;
    transform: translateX(100%);
    transition-duration: 0.25s;
  }
`;

const CloseDrawer = styled.button`
  width: 100%;
  height: 100vh;
  background: #000;
  display: none;
  opacity: 0;
  transition: opacity;
  position: fixed;
  left: 0;
  top: 0;
  will-change: opacity;
  z-index: 998;

  &.opening {
    display: flex;
    opacity: 0;
  }

  &.open {
    display: flex;
    opacity: 0.5;
    transition-duration: 0.25s;
  }

  &.closing {
    display: flex;
    opacity: 0;
    transition-duration: 0.25s;
  }
`;
