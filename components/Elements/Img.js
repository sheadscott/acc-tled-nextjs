import React from 'react';

const Img = (props) => {
  if (props.sizes) {
    return <img
      srcSet={`${props.sizes.medium} 480w, ${props.sizes.medium_large} 800w, ${props.sizes.large} 1024w, ${props.sizes.x_large} 2000w`}
      sizes='100vw'
      src={props.sizes.large}
      alt={props.alt}
      {...props} />
  }

  return <img src={props.src} alt={props.alt} {...props} />;
};

export default Img;