import React from "react";
import styled from "styled-components";

const Spinner = props => {
  return (
    <LoadingAnimation>
      <svg width="50" height="50" viewBox="0 0 50 50">
        <path
          className="st1"
          d="M25 6c10.5 0 19 8.5 19 19s-8.5 19-19 19S6 35.5 6 25 14.5 6 25 6m0-6C11.2 0 0 11.2 0 25s11.2 25 25 25 25-11.2 25-25S38.8 0 25 0z"
        />
        <circle className="st0" cx="24.9" cy="3" r="2.2" />
        <ellipse
          transform="rotate(-30 13.945 5.98)"
          className="st0"
          cx="13.9"
          cy="6"
          rx="2.2"
          ry="2.2"
        />
        <ellipse
          transform="rotate(-60 5.916 14.054)"
          className="st0"
          cx="5.9"
          cy="14.1"
          rx="2.2"
          ry="2.2"
        />
        <circle className="st0" cx="3" cy="25.1" r="2.2" />
        <ellipse
          transform="rotate(-30 5.977 36.054)"
          className="st0"
          cx="6"
          cy="36.1"
          rx="2.2"
          ry="2.2"
        />
        <ellipse
          transform="rotate(-60 14.054 44.085)"
          className="st0"
          cx="14.1"
          cy="44.1"
          rx="2.2"
          ry="2.2"
        />
        <circle className="st0" cx="25.1" cy="47" r="2.2" />
        <ellipse
          transform="rotate(-30 36.052 44.022)"
          className="st0"
          cx="36.1"
          cy="44"
          rx="2.2"
          ry="2.2"
        />
        <ellipse
          transform="rotate(-60 44.084 35.947)"
          className="st0"
          cx="44.1"
          cy="35.9"
          rx="2.2"
          ry="2.2"
        />
        <circle className="st0" cx="47" cy="24.9" r="2.2" />
        <ellipse
          transform="rotate(-30 44.02 13.948)"
          className="st0"
          cx="44"
          cy="13.9"
          rx="2.2"
          ry="2.2"
        />
        <ellipse
          transform="rotate(-60 35.947 5.917)"
          className="st0"
          cx="35.9"
          cy="5.9"
          rx="2.2"
          ry="2.2"
        />
      </svg>
    </LoadingAnimation>
  );
};

const LoadingAnimation = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    // display: block;
    max-width: 30px;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-name: rotateLoop;
    animation-timing-function: linear;
    // margin: 50px auto;
  }

  @keyframes rotateLoop {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .st0 {
    fill: #ffffff;
  }

  .st1 {
    fill: #635662;
    fill: rgba(0, 0, 0, 0.3);
  }
`;

export default Spinner;
