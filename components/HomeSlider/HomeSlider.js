import React, { Component, useState } from 'react';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';
import axios from 'axios';

import { Img } from '../Elements/Elements';
import MediaContainer from '../MediaContainer/MediaContainer';
import { Container, Row, Column } from '../Grid/Grid';
import Parser from '../Parser/Parser';
import { endpoint } from '../../config';

export default class HomeSlider extends Component {
  state = {
    slideData: [],
    currentSlide: 0,
  };

  componentDidMount() {
    axios.get(`${endpoint}acf/v3/pages/226`).then(response => {
      const slideData = [];

      const slideShowItems = response.data.acf.hero_content[0].carousel_content;
      slideShowItems.forEach(function(slide) {
        const info = {};
        info.alt = slide.image_content.alt;
        info.title = slide.image_content.title;
        info.url = slide.image_content.url;
        info.sizes = slide.image_content.sizes;
        info.description = slide.image_description;
        info.page_url = slide.image_description.match(/\/tled\/(.*?)"/)[1];
        console.log(info.page_url);
        slideData.push(info);
      });

      // console.log(slideData);
      this.setState({ slideData });
    });
  }

  changeCarousel = slide => {
    this.setState({ currentSlide: slide });
  };

  render() {
    const { slideData, currentSlide } = this.state;
    return (
      <React.Fragment>
        <StyledCarousel
          showThumbs={false}
          showArrows
          showStatus={false}
          showIndicators={false}
          selectedItem={currentSlide}
          onChange={slide => {
            this.changeCarousel(slide);
          }}
        >
          {slideData.length &&
            slideData.map((slide, index) => (
              <Slide key={index} className="slide" id={slide.title} index={index}>
                <MediaContainer
                  ratio="41.4%"
                  maxHeight="700px"
                  className="slide__wrapper"
                  objectPosition="top"
                >
                  {mediaLoaded => (
                    <Img
                      src={slide.url}
                      sizes={slide.sizes}
                      alt={slide.alt}
                      onLoad={mediaLoaded}
                      className="slide__image"
                    />
                  )}
                </MediaContainer>

                <div className="legend">
                  <Container>
                    <Row>
                      <SlideText>
                        <Parser>{slide.description}</Parser>
                      </SlideText>
                    </Row>
                  </Container>
                </div>
              </Slide>
            ))}
        </StyledCarousel>

        <CarouselControls>
          {slideData.map((item, index) => (
            <li key={`thumbnail-${item.url}`}>
              <Link href={item.page_url}>
                <CarouselControl
                  className={currentSlide === index ? 'active' : null}
                  bg={item.url}
                  title={item.title}
                  index={index}
                >
                  <div>{item.title}</div>
                </CarouselControl>
              </Link>
            </li>
          ))}
        </CarouselControls>
      </React.Fragment>
    );
  }
}

const colors = ['#295b82', '#7d484c', '#ad8d6e', '#20a2b1', '#9977a7'];

const StyledCarousel = styled(Carousel)`
  .control-arrow {
    transition: transform 150ms cubic-bezier(0.61, -0.52, 0.17, 1.69);
    // filter: alpha(opacity=40);
    position: absolute;
    z-index: 1;
    top: 20px;
    background: none;
    border: 0;
    color: black;
    font-size: 32px;
    cursor: pointer;
  }

  .control-arrow:hover {
    transform: scale(1.04);
  }

  .control-arrow::before,
  .carousel-slider.control-arrow::before {
    background: white url(${require('../../images/arrow-left.svg')}) center no-repeat;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 1;
    box-shadow: -2px 2px rgba(0, 0, 0, 0.3);
    content: '';
    @media (min-width: 800px) {
      width: 50px;
      height: 50px;
    }
  }

  .control-disabled.control-arrow {
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: inherit;
    display: none;
  }

  .control-prev.control-arrow {
    left: 0;
    content: '';
  }

  .control-prev.control-arrow:before {
  }

  .control-next.control-arrow {
    right: 0;
  }

  .control-next.control-arrow:before {
    transform: scaleX(-1);
  }

  position: relative;
  width: 100%;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: white;
  }

  * {
    box-sizing: border-box;
  }

  img {
    width: 100%;
    display: inline-block;
    pointer-events: none;
  }

  .slide__wrapper {
    width: 100%;
    position: relative;
    min-height: 300px;
  }

  .slide__wrapper:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgb(19, 57, 82) 0%, rgba(0, 0, 0, 0) 75%);
  }

  .slide__image {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  .carousel {
    position: relative;
  }

  .control-arrow {
    outline: 0;
    border: 0;
    background: none;
    top: 50%;
    margin-top: -13px;
    font-size: 18px;
  }

  .carousel-slider {
    position: relative;
    margin: 0;
    overflow: hidden;
  }

  .carousel-slider .control-arrow {
    top: 0;
    color: #fff;
    font-size: 26px;
    bottom: 0;
    margin-top: 0;
    padding: 25px;
  }

  .slider-wrapper {
    overflow: hidden;
    margin: auto;
    width: 100%;
    transition: height 0.15s ease-in;
  }

  .slider-wrapper.axis-horizontal .slider {
    display: flex;
  }

  .slider-wrapper.axis-horizontal .slider .slide {
    flex-direction: column;
    flex-flow: column;
  }

  .slider-wrapper.axis-vertical {
    display: flex;
  }

  .slider-wrapper.axis-vertical .slider {
    flex-direction: column;
  }

  .slider {
    margin: 0;
    padding: 0;
    position: relative;
    list-style: none;
    width: 100%;
  }

  .slider.animated {
    transition: all 0.35s ease-in-out;
  }

  .slide {
    min-width: 100%;
    margin: 0;
    position: relative;
    text-align: center;
    background: #000;
  }

  .slide img {
    width: 100%;
    vertical-align: top;
    border: 0;
  }

  .slide iframe {
    display: inline-block;
    width: calc(100% - 80px);
    margin: 0 40px 40px;
    border: 0;
  }

  .slide .legend {
    color: #000;
    padding: 0px;
    font-size: 16px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: left;
  }
`;

const Slide = styled.div`
  h3 {
    border-bottom: 4px solid white;
    border-bottom-color: ${props => colors[props.index]};
  }
`;

const SlideText = styled(Column)`
  h2 {
    color: white;
    font-size: 1rem;
    margin: 0;
    @media (min-width: 600px) {
      font-size: 1.5rem;
    }
  }
  h3 {
    color: white;
    font-size: 1.5rem;
    margin: 0;
    font-weight: 700;
    @media (min-width: 700px) {
      font-size: 2rem;
    }
    @media (min-width: 800px) {
      font-size: 3rem;
    }
  }
  p {
    color: #e7e2a3;
  }
  a.button {
    display: inline-block;
    margin-top: 2rem;
    background: white;
    padding: 1rem 2rem;
    text-decoration: none;
    color: #113953;
  }
`;

const CarouselControls = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  width: 100%;
  max-width: 75em;
  align-items: center;
  justify-content: center;
  position: relative;
  top: -50px;

  li:first-child button {
    border-left-width: 8px;
  }

  .carousel-slider {
    transition: transform 150ms cubic-bezier(0.61, -0.52, 0.17, 1.69);
    // filter: alpha(opacity=40);
    position: absolute;
    z-index: 2;
    top: 20px;
    background: none;
    border: 0;
    font-size: 32px;
    cursor: pointer;
  }
`;
// These styles describe the thumbnails under the main slider
const CarouselControl = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  position: relative;
  width: 150px;
  height: 100px;
  border: 4px solid white;
  border-top-width: 8px;
  border-left-width: 0;
  border-right-width: 8px;
  text-transform: uppercase;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.3);
  outline: none;
  margin-bottom: 0.75rem;
  cursor: pointer;

  &[disabled] {
    cursor: not-allowed;
  }

  &:before {
    content: '';
    display: block;
    background: ${props => colors[props.index]};
    height: 100%;
    width: 100%;
    opacity: 1;
    position: absolute;
    // bottom: 0;
    left: 0;
    top: 0;
    z-index: -1;
    transition: transform 0.3s;
  }

  div {
    position: relative;
    z-index: 2;
    transition: transform 0.3s;
  }

  &:focus,
  &.active {
    div {
      transform: translate3d(0, -0.5rem, 0);
    }
    &:before {
      transform: translate3d(0, 0.75rem, 0);
    }
  }

  background-color: #7fb7e3;
  background-color: ${props => colors[props.index]};

  background-image: url(${props => props.bg});
  background-position: center center;
  // background-blend-mode: overlay;
  // background-blend-mode: hard-light;
  background-blend-mode: soft-light;
  background-size: cover;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;
