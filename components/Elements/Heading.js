import styled, { css } from 'styled-components';
import { Box } from '@rebass/grid';

function printHeadingColor(color) {
  if (color) {
    if (color === 'light') {
      return css`color: white;`;
    }

    return css`color: ${color}`;
  }

  return css`color: rgb(26, 82, 118);`
}

function printUnderline(color, underline) {
  if (underline) {
    return css`
      border-bottom-style: solid;
      border-bottom-width: 2px;
      border-bottom-color: ${color || 'rgb(26, 82, 118)'};`;
  }

  return null;
}


// underline => boolean
// emphasis => boolean
// caps => boolean
const Heading = styled(Box)`
  font-weight: 700;
  position: relative;
  
  &:after {
    content: '';
    display: block;
    opacity: 0.35;
    ${props => printUnderline(props.color, props.underline)};
  }

  ${props => printHeadingColor(props.color)};

  ${props => props.caps && css`
    text-transform: uppercase;
  `}

Heading.defaultProps = {
  mb: '1.5rem'
}

  // emphasis prop turns on text shadow
  ${props => props.emphasis && css`
    text-shadow: 2px 2px 0 rgba(0,0,0,0.4);
  `}
`;

export default Heading;