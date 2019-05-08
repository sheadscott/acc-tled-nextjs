import React from 'react';
import styled, { css } from 'styled-components';
import objectFitImages from 'object-fit-images';
import Spinner from '../Spinner/Spinner';

class MediaContainer extends React.Component {
  state = {
    mediaLoaded: false
  };

  componentDidMount() {
    objectFitImages();
  }

  onMediaLoad = () => {
    this.setState({
      mediaLoaded: true
    });
  };

  render() {
    return (
      <Wrapper maxHeight={this.props.maxHeight}>
        <Container mediaLoaded={this.state.mediaLoaded} {...this.props}>
          {this.state.mediaLoaded ? null : <Spinner />}
          {this.props.children(this.onMediaLoad)}
        </Container>
      </Wrapper>
    );
  }
}

MediaContainer.defaultProps = {
  objectPosition: 'center'
};

const Wrapper = styled.div`
  max-height: ${props => props.maxHeight || 'auto'};
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hideen;
`;

// prettier-ignore
const Container = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: ${props => props.ratio || '41.4%'};
  background: #ccc;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  iframe,
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: opacity 0.5s;
    ${props =>
      props.mediaLoaded &&
      css`
        opacity: 1;
      `};
  }

  img {
    object-fit: cover;
    object-position: ${props => props.objectPosition};
    font-family: 'object-fit: cover; object-position: ${props => props.objectPosition};';
  }
`;

export default MediaContainer;
