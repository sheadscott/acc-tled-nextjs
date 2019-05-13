import React from "react";
import styled from "styled-components";

class Submenu extends React.Component {
  state = {
    isOpen: null,
    elementList: []
  };

  focusElement = () => {
    const temp = this.state.elementList;
    temp.push(true);
    this.setState({
      elementList: temp
    });
  };

  blurElement = () => {
    const temp = this.state.elementList;
    temp.pop();
    this.setState({
      elementList: temp
    });

    return new Promise((resolve, reject) =>
      setTimeout(() => {
        resolve(this.state.elementList);
      }, 50)
    );
  };

  resolveState = () => {
    //console.log("running....", this.props.isOpen);
    let result = "";
    if (this.props.isOpen) {
      result += "open";
    }

    return result;
  };

  render() {
    const resolvedState = this.resolveState();
    //console.log("props.isOpen", this.props.isOpen);
    //console.log("visibility class", resolvedState);
    return (
      <SubmenuWrapper
        className={`iw-dropdown__submenuWrapper ${resolvedState}`}
        {...this.props}
      >
        <ul className="iw-dropdown__submenu" onClick={this.props.resetMenu}>
          {this.props.render(this.focusElement, this.blurElement)}
        </ul>
      </SubmenuWrapper>
    );
  }
}

export default Submenu;

const SubmenuWrapper = styled.div`
  position: absolute;
  background: LightBlue;
  display: block;

  &[aria-expanded="false"] {
    display: none;
  }
  &[aria-expanded="true"] {
    display: block;
  }
`;
