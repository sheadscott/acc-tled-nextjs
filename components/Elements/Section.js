import React from 'react';
import styled from 'styled-components';
import { Img } from '../Elements/Elements';
import { Box } from '@rebass/grid';

// <img 
// data-flickity-lazyload-srcset="{{ slide.image_content.url|resize(480) }} 480w, 
// {{ slide.image_content.url|resize(640) }} 640w,
// {{ slide.image_content.url|resize(800) }} 800w, 
// {{ slide.image_content.url|resize(1024) }} 1024w,
// {{ slide.image_content.url|resize(2000) }} 2000w"
// sizes="100vw"
// data-flickity-lazyload-src={{ slide.image_content.url|resize(800) }}
// alt="{{ slide.image_content.alt }}" />


// <img
//         srcset={`${props.sizes.medium} 480w, 
//         ${ props.sizes.medium_large} 800w,
//         ${ props.sizes.large} 1024w`}
//         sizes='100vw'
//         style={{
//           position: 'absolute',
//           left: 0,
//           top: 0,
//           right: 0,
//           bottom: 0
//         }} />}

export default (props) => {
  return (
    <Section as="section" image={props.sizes} bg={props.bg} bgAlign={props.bgAlign} {...props}>
      {props.sizes && <Img
        sizes={props.sizes}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          fontFamily: `"object-fit: cover; object-position: left center"`,
        }} />}

      {props.bg && <Img className="section__bg" src={props.bg} style={{
        fontFamily: `"object-fit: cover; object-position: left center"`,
        objectFit: 'cover',
        objectPosition: 'center',
      }} />}
      {props.children}
    </Section>
  )
}

const Section = styled(Box)`
  position: relative;
  padding: 2rem 0;

  .section__bg {
    display: block;
    width: 100%;
    height: 100%;
    background-position: center center;
    background-size: cover;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    object-fit: cover;
    object-position: left center;
    font-family: "object-fit: cover; object-position: center";
  }
`;