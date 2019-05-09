import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Parser from '../Parser/Parser';
import { Container, Row, Column } from '../Grid/Grid';

const Footer = props => {
  const renderChildren = child => {
    // Internal links using React Router
    if (child.type === 'post_type') {
      const localURL = child.url.replace(
        'https://instruction.austincc.edu/tled',
        ''
      );
      return (
        <li key={child.id}>
          <Link href={localURL}>{child.title}</Link>
        </li>
      );
    }
    // external links
    return (
      <li key={child.id}>
        <a href={child.url}>{child.title}</a>
      </li>
    );
  };
  return (
    <Wrapper>
      <Container>
        <Row py="3rem">
          <WpLinks width={[1, 1, 3 / 4]} mb={['2rem', '2rem', 0]}>
            {props.footerData.map(item => (
              <ul key={`${item.id}ul`}>
                {item.url !== '#' && (
                  <li className="stand-alone">
                    <a href={item.url}>{item.title}</a>
                  </li>
                )}
                {item.url === '#' && <h4>{item.title}</h4>}
                {item.children && item.children.map(renderChildren)}
              </ul>
            ))}
          </WpLinks>

          <Contact width={[1, 1, 1 / 4]} pl={[0, 0, '2rem']}>
            <img src={require('../../images/tledLogo.svg')} alt="Home" />

            <div className="vcard" style={{ marginLeft: '10px' }}>
              <div className="email">
                <a href="mailto:tledwebsite@austincc.edu">
                  tledwebsite@austincc.edu
                </a>
              </div>
              <div className="org">Austin Community College District</div>
              <div className="adr">
                <div className="street-address">5930 Middle Fiskville Rd.</div>
                <div>
                  <span className="locality">Austin</span>,
                  <span className="region"> Texas</span>
                  <span className="postal-code"> 78752</span>
                </div>
              </div>
              <div className="tel">512-223-4ACC (4222)</div>
            </div>
          </Contact>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  width: 100%;
  background: #133952;
  * {
    color: white;
  }
`;

const WpLinks = styled(Column)`
  @media (min-width: 400px) {
    columns: 2;
  }
  @media (min-width: 600px) {
    columns: 3;
  }

  h4 {
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 700;
    color: rgb(244, 239, 172);
  }

  ul {
    list-style: none inside none;
    page-break-inside: avoid;
    break-inside: avoid;
    font-size: 14px;
    font-weight: 400;
    margin: 0 0 1rem 0;
    padding: 0;

    li {
      padding: 3px 0;
      a:hover {
        text-decoration: underline;
        color: white;
      }
      a:active {
        color: white;
      }
      a:focus {
        color: white;
      }
    }
  }
  .stand-alone > a {
    color: rgb(244, 239, 172);
    :hover {
      color: rgb(244, 239, 172);
      text-decoration: underline;
    }
  }
`;

const Contact = styled(Column)`
  .vcard {
    font-size: 12px;

    .email {
      margin-bottom: 12px;

      a:hover,
      a:visited,
      a:link,
      a:active {
        color: #fff;
        text-decoration: underline;
      }
    }
  }

  svg {
    max-width: 240px;
    margin-bottom: 0.8rem;
  }
`;
