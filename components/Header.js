import styled from 'styled-components';
import Link from 'next/link';
import Dropdown from './DropdownMenu';

const Header = props => (
  <StyledHeader>
    <TopNav>
      <Link href="/">
        <img src={require('../images/ACC.svg')} alt="Home" />
      </Link>
      {/* <Nav>
        <Link href="/example">
          <a>Example Page</a>
        </Link>
      </Nav> */}
    </TopNav>
    <Dropdown data={props.navData} />
  </StyledHeader>
);

export default Header;

const StyledHeader = styled.header`
  padding: 2rem;
  padding-bottom: 0;
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
