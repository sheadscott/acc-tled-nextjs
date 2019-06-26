import React from 'react';
import Masonry from 'react-masonry-component';
import styled from 'styled-components';
import Link from 'next/link';
import { Img } from '../Elements/Elements';

const masonryOptions = {
  transitionDuration: 0,
  gutter: 15,
  percentPosition: true,
};

const GridItem = styled.div`
  border: 1px solid rgb(224, 230, 234);
  width: 49%;
  margin-bottom: 16px;
  background: rgb(241, 245, 248);

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const TextWrapper = styled.div`
  margin: 1em;
  h1 {
    font-size: 1.6em;
  }
  h2 {
    font-size: 1.3em;
  }
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

export default class Reports extends React.Component {
  render() {
    const childElements = this.props.elements.map(function(element) {
      const hasLink = element.gsx$linkasneeded.$t;
      const imageId = element.gsx$imageasneeded.$t.split('=')[1];

      const image = imageId ? (
        <Img src={`https://drive.google.com/uc?export=view&id=${imageId}`} />
      ) : (
        <span />
      );
      const title = hasLink ? (
        <Link href={element.gsx$linkasneeded.$t}>
          <a>{element.gsx$topic.$t}</a>
        </Link>
      ) : (
        <span>{element.gsx$topic.$t}</span>
      );
      const tags = element.gsx$hashtags.$t.trim().split(/\s+/);
      return (
        <GridItem key={element.id.$t}>
          {image}
          <TextWrapper>
            <h1>{title}</h1>
            <h2>{element.gsx$category.$t}</h2>
            <p>{element.gsx$content.$t}</p>
            <div>
              {tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </TextWrapper>
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
