import React, { Component } from 'react';
import Link from 'next/link';
import Axios from 'axios';
import styled from 'styled-components';
import { Section, Heading } from 'iw-react-elements';
import { Container, Row, Column } from '../../../../components/Grid/Grid';
import Gallery from '../../../../components/Gallery/GalleryNoTags';

const sessionTimes = {
  1: 'Session One: 9:00am - 10:15am',
  2: 'Session Two: 10:30am - 11:45am',
  3: 'Session Three: 1:15pm - 2:30pm',
  4: 'Session Four: 2:45pm - 4:00pm',
};

export default class SummerSoftwareDay extends Component {
  state = {
    galleryItems: [],
    activeSessions: [],
    tags: [],
    activeTags: [],
    sessionNumber: '',
  };

  static getInitialProps = async ({ query }) => {
    const { session } = query;
    const res = await Axios.get(
      'https://spreadsheets.google.com/feeds/list/1puHw43Vv9SOUC-jKmLXDJhgCbK8dyQqc-haOvOcS-3o/1/public/values?alt=json'
    );
    const galleryItems = res.data.feed.entry;
    return { session, galleryItems };
  };

  filterSessions = (allSessions, sessionTag) =>
    allSessions.filter(session => session.gsx$session.$t === sessionTag);

  activateSessions = key => {
    const activeSessions = this.filterSessions(this.props.galleryItems, key);
    this.setState({ activeSessions, sessionNumber: key });
  };

  modifyUrl = key => {
    history.pushState(
      { session: key },
      `Session ${key}`,
      `/development-opportunities/programs/summer-software-day/breakout-sessions?session=${key}`
    );
  };

  render() {
    const { session } = this.props;

    const { activeSessions, sessionNumber, tags } = this.state;
    console.log('SESSION: ', session);
    if (!sessionNumber) {
      console.log('SESSIONNUMBER: ', session);
      this.activateSessions(session);
    }
    return (
      <Container>
        <Section>
          <Row>
            <Column width={[1, 1 / 3]} pr={[0, '2rem']} order={[2, 1]}>
              <Aside>
                <nav>
                  <Link href="/development-opportunities/programs/summer-software-day-testing">
                    <a>Home</a>
                  </Link>
                  <a
                    onClick={() => {
                      this.activateSessions('1');
                      this.modifyUrl('1');
                    }}
                  >
                    Session 1
                  </a>
                  <a
                    onClick={() => {
                      this.activateSessions('2');
                      this.modifyUrl('2');
                    }}
                  >
                    Session 2
                  </a>
                  <a
                    onClick={() => {
                      this.activateSessions('3');
                      this.modifyUrl('3');
                    }}
                  >
                    Session 3
                  </a>
                  <a
                    onClick={() => {
                      this.activateSessions('4');
                      this.modifyUrl('4');
                    }}
                  >
                    Session 4
                  </a>
                </nav>
              </Aside>
            </Column>

            <Column width={[1, 2 / 3]} order={[1, 2]}>
              <Heading as="h1">{sessionTimes[sessionNumber]}</Heading>
              <GalleryWrapper>
                <Gallery elements={activeSessions} tags={tags} />
              </GalleryWrapper>
            </Column>
          </Row>
        </Section>
      </Container>
    );
  }
}

const Aside = styled.aside`
  margin-top: 2rem;
  ${props =>
    props.backgroundColor &&
    `
      background-color: ${props.backgroundColor};
      padding: 1rem;
      height: calc(100% - 2rem);
    `}
  nav a {
    margin-bottom: 0.8rem;
    display: block;
  }
`;

const GalleryWrapper = styled.div`
  margin-top: 2.4rem;
`;
