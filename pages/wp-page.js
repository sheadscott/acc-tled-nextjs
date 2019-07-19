import React from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import decode from 'unescape';
import Error from 'next/error';
import Head from 'next/head';
import { Section, Heading } from 'iw-react-elements';
import { Container, Row, Column } from '../components/Grid/Grid';
import { endpoint } from '../config';
import ACF from '../components/ACF/ACF';
import Hero from '../components/ACF/Hero';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import { fetchBreadcrumbs } from '../components/Breadcrumbs/fetchBreadcrumbData';
import Parser from '../components/Parser/Parser';

const WPPage = ({ errorCode, pageContent, pageTitle, breadcrumbs }) => {
  if (errorCode) return <Error statusCode={errorCode} />;
  const ACFData = pageContent ? pageContent.acf : null;
  const renderTitle = () => <Parser>{pageTitle}</Parser>;

  return (
    <React.Fragment>
      <Container>
        <Head>
          <title>{decode(pageTitle)}</title>
        </Head>
        {ACFData && ACFData.hero_content && (
          <div className="hero" style={{ marginTop: '1.5rem' }}>
            {ACFData.hero_content[0].acf_fc_layout && (
              <Hero data={ACFData.hero_content[0]} />
            )}
          </div>
        )}

        <Breadcrumbs data={breadcrumbs} />

        {/* no sidebars */}
        {pageContent.template === '' && pageContent.content.rendered && (
          <Section>
            <Row flexWrap="nowrap">
              <Column width={1}>
                <Heading as="h1" underline caps>
                  {renderTitle()}
                </Heading>
                {pageContent && <Parser>{pageContent.content.rendered}</Parser>}
              </Column>
            </Row>
          </Section>
        )}
        {/* End no sidebars */}

        {/* sidebar right and left */}
        {ACFData && pageContent.template === 'page-sidebar-left-right.php' && (
          <Section>
            <Row>
              <Column
                width={[1, 1 / 4]}
                order={[2, 1]}
                pr={[0, '2rem']}
                className="leftSidebar"
              >
                <Aside
                  backgroundColor={
                    ACFData.sidebar_left_background &&
                    ACFData.sidebar_left_background.background_a === 'Color'
                      ? ACFData.sidebar_left_background.background_color_a
                      : null
                  }
                >
                  <Parser>{ACFData.sidebar_left}</Parser>
                </Aside>
              </Column>

              <Column width={[1, 1 / 2]} order={[1, 2]}>
                {pageContent && (
                  <Section>
                    <Heading as="h1" underline caps>
                      {renderTitle()}
                    </Heading>
                    <div>
                      <Parser>{pageContent.content.rendered}</Parser>
                    </div>
                  </Section>
                )}
              </Column>

              <Column
                width={[1, 1 / 4]}
                order={[3, 3]}
                pl={[0, '2rem']}
                className="rightSidebar"
              >
                <Aside
                  backgroundColor={
                    ACFData.sidebar_right_background &&
                    ACFData.sidebar_right_background.background_b === 'Color'
                      ? ACFData.sidebar_right_background.background_color_b
                      : null
                  }
                >
                  <Parser>{ACFData.sidebar_right}</Parser>
                </Aside>
              </Column>
            </Row>
          </Section>
        )}
        {/* End sidebar right and left */}

        {/* sidebar right only */}
        {ACFData && pageContent.template === 'page-sidebar-right.php' && (
          <Section>
            <Row>
              <Column width={[1, 2 / 3]}>
                <Heading as="h1" underline caps>
                  {renderTitle()}
                </Heading>
                {pageContent && (
                  <section>
                    <Parser>{pageContent.content.rendered}</Parser>
                  </section>
                )}
              </Column>

              <Column width={[1, 1 / 3]} pl={[0, '2rem']}>
                <Aside
                  backgroundColor={
                    ACFData.sidebar_right_background &&
                    ACFData.sidebar_right_background.background_b === 'Color'
                      ? ACFData.sidebar_right_background.background_color_b
                      : null
                  }
                >
                  <Parser>{ACFData.sidebar_right}</Parser>
                </Aside>
              </Column>
            </Row>
          </Section>
        )}
        {/* End sidebar right only */}

        {/* sidebar left only */}
        {ACFData && pageContent.template === 'page-sidebar-left.php' && (
          <Section>
            <Row>
              <Column width={[1, 1 / 3]} pr={[0, '2rem']} order={[2, 1]}>
                <Aside
                  backgroundColor={
                    ACFData.sidebar_left_background &&
                    ACFData.sidebar_left_background.background_a === 'Color'
                      ? ACFData.sidebar_left_background.background_color_a
                      : null
                  }
                >
                  <Parser>{ACFData.sidebar_left}</Parser>
                </Aside>
              </Column>

              <Column width={[1, 2 / 3]} order={[1, 2]}>
                <Heading as="h1" underline caps>
                  {renderTitle()}
                </Heading>
                {pageContent && (
                  <section>
                    <Parser>{pageContent.content.rendered}</Parser>
                  </section>
                )}
              </Column>
            </Row>
          </Section>
        )}
        {/*  End sidebar left only */}
      </Container>
      {ACFData && <ACF layouts={ACFData.layouts} />}
    </React.Fragment>
  );
};

if (!Array.prototype.last) {
  Array.prototype.last = function() {
    return this[this.length - 1];
  };
}

WPPage.getInitialProps = async ({ asPath, res }) => {
  const slug = asPath
    .split('?')[0]
    .replace(/\/$/, '')
    .split('/')
    .last();

  console.log('SLUG: ', slug);

  const wpContent = await Axios.get(`${endpoint}wp/v2/pages?slug=${slug}`);

  const pageContent = wpContent.data[0];
  const pageTitle = pageContent.title.rendered;
  console.log(pageContent);

  const breadcrumbs = await fetchBreadcrumbs(endpoint, pageContent.id);

  console.log('BREADCRUMBS: ', breadcrumbs);
  if (res && pageContent) {
    res.writeHead(200);
  }

  if (!pageContent && res) {
    res.writeHead(404);
    wpContent.statusCode = 404;
  }

  const errorCode = wpContent.statusCode > 200 ? wpContent.statusCode : false;
  return {
    errorCode,
    pageContent,
    pageTitle,
    breadcrumbs,
  };
};

export default WPPage;

const Aside = styled.aside`
  margin-top: 2rem;
  ${props =>
    props.backgroundColor &&
    `
      background-color: ${props.backgroundColor};
      padding: 1rem;
      height: calc(100% - 2rem);
    `}
  ul li {
    margin-bottom: 0.6rem;
  }
`;
