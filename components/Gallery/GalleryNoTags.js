import React from 'react';
import Masonry from 'react-masonry-component';
import styled from 'styled-components';

const masonryOptions = {
  transitionDuration: 0,
  gutter: 15,
  percentPosition: true,
};

const GridItem = styled.div`
  border: 1px solid rgb(224, 230, 234);
  width: 47%;
  margin-bottom: 16px;
  background: rgb(241, 245, 248);
  padding: 20px;
  h2,
  p.description {
    padding-left: 10%;
    padding-right: 10%;
  }
  h2 {
    font-size: 1.3em;
  }
  p.presenter {
    font-style: italic;
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const ImgWrapper = styled.div`
  display: block;
  width: 150px;
  height: 150px;
  background: #e6e7ed;
  border-radius: 50%;
  background-image: url(${props => props.bgImg});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  margin: 0 auto;
`;

const Tag = styled.span`
  display: inline-block;
  padding: 2px 6px;
  margin: 4px;
  background: rgb(193, 196, 197);
  color: #333;
  border-radius: 4px;
  font-size: 0.8em;
`;
const Register = styled.a`
  width: 40%;
  display: block;
  margin: 0 auto;
  margin-top: 12px;
  padding: 4px 6px;
  background: purple;
  text-align: center;
  &.link {
    color: white !important;
  }
`;
class Gallery extends React.Component {
  render() {
    const childElements = this.props.elements.map(function(element) {
      return (
        <GridItem key={element.id.$t}>
          <h2>{element.gsx$workshoptitle.$t}</h2>
          {element.gsx$headshot.$t && <ImgWrapper bgImg={element.gsx$headshot.$t} />}
          <p className="presenter">{element.gsx$presenter.$t}</p>
          <p className="description">{element.gsx$shortdescription.$t}</p>
          <Register className="link" href={element.gsx$linktoregister.$t}>
            Register
          </Register>
        </GridItem>
      );
    });

    return (
      <Masonry
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
      >
        {childElements}
      </Masonry>
    );
  }
}

export default Gallery;
