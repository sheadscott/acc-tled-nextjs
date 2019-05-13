import { Box } from '@rebass/grid';
import styled from 'styled-components';

const HR = styled(Box)`
  display: block;
  width: 100%;
  background: transparent;
  border: none;
  border-bottom-color: ${props => props.color};
  border-bottom-style: ${props => props.borderStyle};
  border-bottom-width: ${props => props.borderWidth};
  opacity: ${props => props.opacity}
`;

HR.defaultProps = {
  color: 'rgb(26,82,118)',
  borderStyle: 'solid',
  borderWidth: '2px',
  opacity: 0.35,
  as: 'hr'
}

export default HR;