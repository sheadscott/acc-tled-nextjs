import React from 'react';
import Axios from 'axios';
import Error from 'next/error';
import styled from 'styled-components';
import Link from 'next/link';
import { endpoint } from '../config';
import { HR, Heading } from '../components/Elements/Elements';
import { Container, Row, Column } from '../components/Grid/Grid';
import Parser from '../components/Parser/Parser';
import HomeSlider from '../components/HomeSlider/HomeSlider';
import EventList from '../components/EventList/EventList';

const Index = ({ pageContent, pageSections, events }) => {
  const ACFData = pageContent ? pageContent.acf : null;

  if (!pageContent) return <Error status={404} />;
  return (
    <React.Fragment>
      <div>
        <Link href="/wp-page-test">
          <a>Wordpress Test Page</a>
        </Link>
      </div>
      <HomeSlider />
      <Container>
        {ACFData && ACFData.sidebar_left && (
          <React.Fragment>
            <Intro>
              <Column width={[1, '35%']} pr={[0, '1rem']} order={[2, 1]}>
                <section style={{ textAlign: 'center' }}>
                  <Parser>{ACFData.sidebar_left}</Parser>
                </section>
              </Column>
              {/* Empowering Segement */}
              <Column width={[1, '65%']} pl={[0, '1rem']} mb={['2rem', 0]} order={[1, 2]}>
                {pageContent && (
                  <section>
                    <Parser>{pageContent.content.rendered}</Parser>
                  </section>
                )}
              </Column>
            </Intro>
          </React.Fragment>
        )}

        {/* Featured */}
        {pageSections && pageSections.featured && (
          <Row>
            <HR my="4rem" />
            <Column width={[1, 1 / 2]}>
              <div>
                <Parser>{pageSections.featured.column_1}</Parser>
              </div>
            </Column>

            <Column width={[1, 1 / 2]} pl={[0, '4rem']}>
              <div>
                <Parser>{pageSections.featured.column_2}</Parser>
              </div>
            </Column>
            <HR mt="3rem" mb="2rem" />
          </Row>
        )}

        <Row>
          <Column width={[1, 1 / 2]}>
            {/* Culturally Responsive Teaching */}
            <StyledRow as="section">
              {pageSections && pageSections.culturallyResponsiveTeaching && (
                <React.Fragment>
                  <Column as="section" width={1} px={0}>
                    <Heading as="h2" fontSize="1.3rem" underline={false} caps mb="1.5rem">
                      <Parser>{pageSections.culturallyResponsiveTeaching.heading}</Parser>
                    </Heading>

                    <Row>
                      <Column
                        width={[1, 1, 1 / 2]}
                        px={0}
                        style={{ paddingRight: '2rem' }}
                      >
                        <div>
                          <Parser>
                            {pageSections.culturallyResponsiveTeaching.column_1}
                          </Parser>
                        </div>
                      </Column>
                      <Column width={[1, 1, 1 / 2]}>
                        <div>
                          <Parser>
                            {pageSections.culturallyResponsiveTeaching.column_2}
                          </Parser>
                        </div>
                      </Column>
                    </Row>
                  </Column>
                  <HR my={4} />
                </React.Fragment>
              )}

              {/* In The Spotlight */}
              {pageSections && pageSections.spotlight && (
                <Column as="section" width={1} px={0}>
                  <Heading as="h2" fontSize="1.3rem" underline={false} caps mb="1.5rem">
                    <Parser>{pageSections.spotlight.heading}</Parser>
                  </Heading>
                  <Row>
                    <Column width={[1, 1, 1 / 2]} px={0} style={{ paddingRight: '2rem' }}>
                      <div>
                        <Parser>{pageSections.spotlight.column_1}</Parser>
                      </div>
                    </Column>
                    <Column width={[1, 1, 1 / 2]}>
                      <div>
                        <Parser>{pageSections.spotlight.column_2}</Parser>
                      </div>
                    </Column>
                  </Row>
                </Column>
              )}
            </StyledRow>
          </Column>

          {/* Events and Important Dates */}
          <Column width={[1, 1 / 2]} as="section" pl={[0, '4rem']}>
            <EventList length="10" events={events} />
          </Column>
        </Row>

        {/* Stay Updated */}
        <Row py="4rem">
          <Column width={1}>
            <StayUpdated>
              <span>Stay Updated</span>
            </StayUpdated>
            <SocialMediaList>
              <li>
                <a
                  href="https://visitor.r20.constantcontact.com/manage/optin?v=001FlfxD6VXczHtBgSW4c7sKZ6ZZ9JT6B4sGA-YwBavyDl_eONpTi0Tuy1dZmuL_qMyhMgAC4ilOdju5zlRCGpyRDfKiRQqWXWi-IdIg7hPoxQ%3D"
                  className="button"
                >
                  TLED NEWSLETTER
                </a>
              </li>
              <li>
                <Link href="https://www.youtube.com/channel/UChxBfVNHbWUc5qfcl8XgL9g">
                  <a title="youtube">
                    <Parser>{require('../images/youtube.svg?include')}</Parser>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://www.facebook.com/accTLED/">
                  <a title="facebook">
                    <Parser>{require('../images/facebook.svg?include')}</Parser>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://twitter.com/accTLED">
                  <a title="twitter">
                    <Parser>{require('../images/twitter.svg?include')}</Parser>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="https://www.instagram.com/acctled/">
                  <a title="instagram">
                    <Parser>{require('../images/instagram.svg?include')}</Parser>
                  </a>
                </Link>
              </li>
            </SocialMediaList>
          </Column>
        </Row>
      </Container>
    </React.Fragment>
  );
};

Index.getInitialProps = async ({ res, asPath }) => {
  const pageObject = {};
  await Axios.get(`${endpoint}wp/v2/pages?slug=home`)
    .catch(function(error) {
      // handle error
      console.error('*** ERROR *** WPPage.js: ', error);
    })
    .then(response => {
      // console.log('Response: ', response);
      const html = response.data[0];

      const pageSections = {};
      html.acf.layouts.forEach(item => {
        if (item.id) {
          pageSections[item.id] = item;
        }
      });

      // console.log(html);
      if (!html && res) {
        res.statusCode = 404;
        return {
          pageContent: null,
          pageTitle: null,
        };
      }
      pageObject.pageContent = html;
      pageObject.pageSections = pageSections;
    });

  // Fetch event list
  const sheetId = '1feRPiGXCX19MZofZ2LgLgYbvxpGJYFByhJ6ZAlOkWiM';
  await Axios.get(
    `https://spreadsheets.google.com/feeds/list/${sheetId}/1/public/values?alt=json`
  ).then(response => {
    const events = response.data.feed.entry;
    const filteredEvents = events
      .filter(
        event =>
          // Return if date is in the future
          new Date(event.gsx$dateforautocheck.$t.replace(/.*?,\s/, '')).valueOf() >
          Date.now() - 1000 * 60 * 60 * 24 // Today - 24 hours in milliseconds
      )
      .sort((a, b) => {
        // Take the day of the week off the front of the string and convert to Date # value
        // Probably unnecessary since the events are returned in the order in sheet
        a = new Date(a.gsx$dateforautocheck.$t.replace(/.*?,\s/, '')).valueOf();
        b = new Date(b.gsx$dateforautocheck.$t.replace(/.*?,\s/, '')).valueOf();
        return a - b;
      });
    // console.log("Events: ", filteredEvents);
    pageObject.events = filteredEvents;
  });

  return { ...pageObject };
};

export default Index;

const Intro = styled(Row)`
  h2 {
    font-size: 1.6rem !important;
    font-weight: 700 !important;
  }
  a.button {
    margin: 0 1rem;
    @media (max-width: 400px) {
      margin: 0.5rem 1rem;
    }
  }
`;

const StyledRow = styled(Row)`
  p {
    margin-bottom: 0;
  }
`;
const StayUpdated = styled.h2`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: #555;
  font-size: 1.3rem;

  span {
    display: block;
    padding: 0 1rem;
    flex-shrink: 0;
    @media (min-width: 600px) {
      padding: 0 4rem;
    }
  }

  &:before,
  &:after {
    content: '';
    border-bottom: 2px solid rgba(26, 82, 118, 0.35);
    width: 100%;
  }
`;

const SocialMediaList = styled.ul`
  margin: 2rem 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  li {
    margin: 0 3rem;
  }

  a {
    display: block;
    height: 100%;
  }

  a.button {
    background: rgb(91, 43, 112);
    border-radius: 4px;
    padding: 0.5rem 1rem;
    margin-top: 5px;
  }

  svg {
    fill: rgb(91, 43, 112);
    width: 30px;
  }

  a[title='youtube'] svg {
    width: 40px;
  }
`;
