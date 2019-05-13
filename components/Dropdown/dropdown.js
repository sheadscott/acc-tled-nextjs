import React from "react";
import Submenu from "./submenu";
import uuid4 from "uuid/v4";

class Dropdown extends React.Component {
  state = {
    isOpen: false,
    activeItem: null,
    reset: null,
    buttonId: "button",
    submenuId: "submenu"
  };

  static getDerivedStateFromProps(newProps, prevState) {
    // console.log("get derived state from props");
    if (newProps.reset === true) {
      return {
        reset: newProps.reset,
        isOpen: false
      };
    }

    if (newProps.activeItem !== prevState.activeItem) {
      return {
        activeItem: newProps.activeItem,
        reset: newProps.reset,
        isOpen: newProps.activeItem === newProps.title
      };
    }

    return null;
  }

  componentDidMount() {
    this.setState({
      buttonId: uuid4(),
      submenuId: uuid4()
    });
  }

  toggleMenu = title => {
    const newOpenState = !this.state.isOpen;
    console.log("dropdown toggle menu", this.state.isOpen);
    if (newOpenState) {
      this.props.setActiveItem(title);
    }
    console.log("toggling previous state", newOpenState);
    this.setState(
      {
        isOpen: newOpenState
      },
      () => {
        console.log("new toggled state", this.state.isOpen);
        if (this.state.isOpen) {
          this.props.setActiveItem(title);
          console.log(this.props.title, "activated");
        }
      }
    );
  };

  render() {
    const menuIsOpen =
      this.state.activeItem === this.props.title && this.state.isOpen;
    return (
      <React.Fragment>
        <button
          id={this.state.button}
          className={`iw-dropdown__menuToggle ${menuIsOpen ? 'active' : null}`}
          aria-expanded={menuIsOpen}
          aria-controls={this.state.submenuId}
          onClick={() => {
            this.toggleMenu(this.props.title);
          }}
        >
          {this.props.title}
        </button>
        <Submenu
          id={this.state.submenuId}
          role="region"
          aria-labelledby={this.state.buttonId}
          aria-expanded={menuIsOpen}
          aria-hidden={!menuIsOpen}
          isOpen={menuIsOpen}
          onFocus={el => console.log("list focus", el.target)}
          resetMenu={this.props.resetMenu}
          render={(focusElement, blurElement) => (
            <React.Fragment>
              {this.props.renderChildren(
                this.props.list,
                this.toggleMenu,
                focusElement,
                blurElement
              )}
            </React.Fragment>
          )}
        />
      </React.Fragment>
    );
  }
}

export default Dropdown;
