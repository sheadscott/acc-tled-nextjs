import React from 'react';
import styled from 'styled-components';
import Parser from 'html-react-parser';
import MediaContainer from '../MediaContainer/MediaContainer';
// import FlickityCarousel from '../Flickity/Flickity';
import { Img } from '../Elements/Elements';

// import './carousel.scss';
// import { Carousel } from 'react-responsive-carousel';

export default function Hero(props) {
  // console.log(props.data.acf_fc_layout);
  const layout = props.data.acf_fc_layout;

  if (layout === 'html') {
    return (
      <div
        className="container"
        style={{
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
        }}
      >
        <HTMLContentBox>
          {Parser(props.data.html_content, {
            replace(data) {
              console.log('element', data.attribs);
              if (data.attribs) {
                delete data.attribs.style;
              }

              return data.name === 'iframe' ? (
                <MediaContainer ratio="30%">
                  {mediaLoaded => (
                    <iframe
                      title="iframe content"
                      onLoad={mediaLoaded}
                      style={{ border: 'none' }}
                      {...data.attribs}
                    />
                  )}
                </MediaContainer>
              ) : null;
            },
          })}
        </HTMLContentBox>
        {props.data.background_image && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MediaContainer ratio="100%">
              {mediaLoaded => (
                <Img
                  src={props.data.background_image.url}
                  sizes={props.data.background_image.sizes}
                  alt={props.data.background_image.alt}
                  onLoad={mediaLoaded}
                />
              )}
            </MediaContainer>
          </div>
        )}
      </div>
    );
  }

  if (layout === 'image') {
    if (props.data.image_description) {
      return (
        <div className="container">
          <figure className="hero-content" style={{ margin: 0 }}>
            <MediaContainer>
              {mediaLoaded => (
                <Img
                  src={props.data.image_content.url}
                  sizes={props.data.image_content.sizes}
                  alt={props.data.image_content.alt}
                  onLoad={mediaLoaded}
                />
              )}
            </MediaContainer>
            <figcaption>{props.data.image_description}</figcaption>
          </figure>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="hero-content">
          <MediaContainer>
            {mediaLoaded => (
              <Img
                src={props.data.image_content.url}
                sizes={props.data.image_content.sizes}
                alt={props.data.image_content.alt}
                onLoad={mediaLoaded}
              />
            )}
          </MediaContainer>
        </div>
      </div>
    );
  }

  // if (layout === 'carousel') {
  //   return <div>Carousel</div>;
  //   return <FlickityCarousel height="100%" layout={props.data} />;
  //   return (
  //     <React.Fragment>
  //       <div style={{ margin: '0 0 1rem' }}>
  //         <FlickityCarousel layout={props.data} />
  //       </div>
  //     </React.Fragment>
  //   );
  // }

  return null;
}

const HTMLContentBox = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  background: transparent;
`;

// const HeroImage = ({ data }) => {
//   // check if hero image has a description
//   if (data.image_description) {
//     return (
//       <div className="container">
//         <figure className="hero-content" style={{ margin: 0 }}>
//           <MediaContainer>
//             {mediaLoaded => <Img src={data.image_content.url} sizes={data.image_content.sizes} alt={data.image_content.alt} onLoad={mediaLoaded} />}
//           </MediaContainer>
//           <figcaption style={{ textAlign: 'right', opacity: 0.5, fontStyle: 'italic' }}>
//             {data.image_description}
//           </figcaption>
//         </figure>
//       </div>
//     )
//   }

//   return (
//     <div className="container">
//       <div className="hero-content">
//         <MediaContainer>
//           {mediaLoaded => <Img src={data.image_content.url} sizes={data.image_content.sizes} alt={data.image_content.alt} onLoad={mediaLoaded} />}
//         </MediaContainer>
//       </div>
//     </div>
//   )
// }

// const HeroHTML = ({ data }) => {
//   console.log('hero data', data, data.html_content, data.background_image.sizes);
//   return (
//     <div className="container" style={{
//       position: 'relative',
//       overflow: 'hidden',
//       display: 'flex',
//       flexDirection: 'column',
//       alignContent: 'center'
//     }}>

//       <HTMLContentBox>{Parser(data.html_content)}</HTMLContentBox>
//       <div style={{
//         position: 'absolute',
//         left: 0,
//         top: 0,
//         right: 0,
//         bottom: 0,
//         height: '100%',
//         width: '100%',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center'
//       }}>
//         <MediaContainer ratio="100%">
//           {mediaLoaded => <Img src={data.background_image.url} sizes={data.background_image.sizes} alt={data.background_image.alt} onLoad={mediaLoaded} />}
//         </MediaContainer>
//       </div>
//     </div>
//   );
// }

// const HTMLContentBox = styled.div`
//   position: relative;
//   z-index: 10;
//   width: 100%;
//   padding: 1.5rem;
// `;

// const HeroCarousel = ({ data }) => {
// return <div>Hero Carousel</div>
// <div className="container"><div className="hero main-carousel"></div></div>
//   const $carouselContainer = $('.main-carousel');

//   const carouselLength = ACFData.hero[0].carousel_content.length;

//   let innerCarousel = '';

//   for (let i = 0; i < carouselLength; i++) {
//     var img = getImage(ACFData.hero[0].carousel_content[i].image_content, ACFData.hero[0].image_alt_text, true);
//     let imgHTML = '<div className="carousel-cell">' + img + '</div>';

//     addToCarousel(imgHTML);
//     if (i === carouselLength - 1) {
//       $carouselContainer.append(innerCarousel);
//       createCarousel();
//     }
//   };

//   function addToCarousel(imgHTML) {
//     innerCarousel += imgHTML;
//   }

//   function createCarousel() {
//     $carouselContainer.flickity({
//       // options
//       contain: true,
//       cellAlign: 'left',
//       lazyLoad: true,
//       draggable: true,
//       wrapAround: true,
//       accessibility: true,
//       prevNextButtons: true,
//       autoPlay: 4000,
//       pageDots: true,
//       imagesLoaded: true,
//       // fullscreen: true,
//     });
//   }
// }
// }
