import styled from 'styled-components';
import Link from 'next/link';
import Dropdown from './DropdownMenu';

const Header = props => <StyledHeader>{props.children}</StyledHeader>;

export default Header;

const StyledHeader = styled.header`
  background-color: ${props => props.theme.colors.primaryBlue};

  img {
    width: 120px;
  }
  #submenu {
    display: none;
  }
`;

const TopNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
