import React from 'react';
import styled from 'styled-components';

import Dropdown from './dropdown';

const StyledNav = styled.nav``;

const List = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
`;

class DropdownMenu extends React.Component {
  state = {
    reset: null,
    activeItem: false,
  };

  componentDidMount() {
    // console.log('NAV: ', this.nav);
    window.addEventListener('click', this.handleClick);

    // reset on escape key
    window.addEventListener('keydown', event => {
      console.log('keyboard event', event.type, event.keyCode);
      if (event.type === 'keydown' && event.keyCode === 27) {
        this.resetMenu();
      }
    });
  }

  handleClick = e => {
    console.log('THIS: ', this);
    console.log('TARGET: ', e.target);
    const navContains = this.nav.contains(e.target);
    console.log(navContains);
    if (!navContains) {
      console.log('RESET CALLED');
      this.resetMenu();
    }
  };

  setActiveItem = name => {
    this.setState({
      reset: null,
      activeItem: name,
    });
  };

  resetMenu = () => {
    this.setState({
      reset: true,
    });
  };

  render() {
    return (
      <StyledNav className="iw-dropdown" ref={el => (this.nav = el)} {...this.props}>
        <List className="iw-dropdown__menu">
          {this.props.data.map((item, index) => (
            <li key={item.id} className="iw-dropdown__menuItem">
              {item.children ? (
                <Dropdown
                  list={item.children}
                  title={item.title}
                  reset={this.state.reset}
                  setActiveItem={this.setActiveItem}
                  activeItem={this.state.activeItem}
                  renderChildren={this.props.renderChildren}
                  resetMenu={this.resetMenu}
                />
              ) : (
                React.cloneElement(this.props.renderLink(item), {
                  onClick: this.resetMenu,
                })
              )}
            </li>
          ))}
        </List>
      </StyledNav>
    );
  }
}

export default DropdownMenu;
