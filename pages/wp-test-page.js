import React from 'react';
import Axios from 'axios';
import Error from 'next/error';
import Head from 'next/head';
import { Section, Heading } from 'iw-react-elements';
import { endpoint } from '../config';
import { Container, Row, Column } from '../components/Grid/Grid';
import ACF from '../components/ACF/ACF';
import Hero from '../components/ACF/Hero';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Parser from '../components/Parser/Parser';

if (!Array.prototype.last) {
  Array.prototype.last = function() {
    return this[this.length - 1];
  };
}

const WPPage = ({ errorCode, pageContent, pageTitle }) => {
  if (errorCode) return <Error statusCode={errorCode} />;
  const ACFData = pageContent ? pageContent.acf : null;
  console.log(pageContent);

  return (
    <React.Fragment>
      <Container>
        {ACFData && ACFData.hero_content && (
          <div className="hero" style={{ marginTop: '1.5rem' }}>
            {ACFData.hero_content[0].acf_fc_layout && <Hero data={ACFData.hero_content[0]} />}
          </div>
        )}

        <Breadcrumbs data={breadcrumbs} />

        {/* no sidebars */}
        {pageContent.template === '' && pageContent.content.rendered && (
          <Section>
            <Row flexWrap="nowrap">
              <Column width={1}>
                <Heading as="h1" underline caps>
                  {pageContent.title.rendered}
                </Heading>
                {pageContent && <Parser>{pageContent.content.rendered}</Parser>}
              </Column>
            </Row>
          </Section>
        )}
      </Container>
      {ACFData && <ACF layouts={ACFData.layouts} />}
    </React.Fragment>
  );
};

WPPage.getInitialProps = async ({ asPath, res }) => {
  console.log(asPath);
  const slug = asPath
    .split('?')[0]
    .split('/')
    .last();

  const wpContent = await Axios.get(`${endpoint}wp/v2/pages?slug=course-design-consultations`);

  const pageContent = wpContent.data[0];
  const pageTitle = pageContent.title.rendered;
  // console.log(html);

  if (res && pageContent) {
    res.writeHead(200);
    // console.log('bingbong');
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
  };
};

export default WPPage;
