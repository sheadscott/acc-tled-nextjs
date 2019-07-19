import React, { Component } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import { Section, Heading } from 'iw-react-elements';
import { Container, Row, Column } from '../../../../components/Grid/Grid';
import Gallery from '../../../../components/Gallery/GalleryWithTags';
import Parser from '../../../../components/Parser/Parser';

const sessionTimes = {
  1: 'Session One: 9:00am - 10:20am',
  2: 'Session Two: 10:30am - 11:50am',
  3: 'Session Three: 1:10pm - 2:30pm',
  4: 'Session Four: 2:40pm - 4:00pm',
};

if (!Array.prototype.last) {
  Array.prototype.last = function() {
    return this[this.length - 1];
  };
}

export default class SummerSoftwareDay extends Component {
  state = {
    galleryItems: [],
    activeSessions: [],
    tags: [],
    activeTags: [],
    sessionNumber: this.props.session,
  };

  static getInitialProps = async ({ query }) => {
    const wpContent = await Axios.get(
      `https://instruction.austincc.edu/tled/wp-json/wp/v2/pages?slug=summer-software-day-testing`
    );

    const pageContent = wpContent.data[0];
    // const pageTitle = pageContent.title.rendered;
    // console.log(pageContent.acf.layouts[0].size); // Returns [ 'Wide' ]

    console.log('QUERY: ', query);
    const { session } = query;
    const res = await Axios.get(
      'https://spreadsheets.google.com/feeds/list/1puHw43Vv9SOUC-jKmLXDJhgCbK8dyQqc-haOvOcS-3o/1/public/values?alt=json'
    );
    const galleryItems = res.data.feed.entry;
    return { session, galleryItems, pageContent };
  };

  componentDidMount = () => {
    this.activateSessions(this.props.session);
  };

  filterSessions = (allSessions, sessionTag) =>
    allSessions.filter(session => session.gsx$session.$t === sessionTag);

  filterSessionsByTag = activeTags =>
    this.props.galleryItems.filter(session => {
      const sessionTags = session.gsx$tags.$t.trim().split(/\s+/);
      return (
        // return true if item is in the current session and has at least one active tag
        session.gsx$session.$t === this.state.sessionNumber &&
        activeTags.some(tag => sessionTags.indexOf(tag) > -1)
      );
    });

  activateSessions = key => {
    console.log('activateSessions state:', this.state);
    // Clear activeTags if any
    // this.setState({ activeTags: [] });
    const activeSessions = this.filterSessions(this.props.galleryItems, key);
    this.setState({ activeSessions }, this.filterTagsBySession);
  };

  filterTagsBySession = () => {
    // Get a unique array of tags
    let tags = [];
    this.state.activeSessions.forEach(function(item) {
      const tagArray = item.gsx$tags.$t.trim().split(/\s+/);
      tags = [...tags, ...tagArray];
    });
    // Convert the array to unique values
    tags = [...new Set(tags)];
    // Move #faculty and #staff to the end of the array
    tags.push(tags.splice(tags.indexOf('#faculty'), 1)[0]);
    tags.push(tags.splice(tags.indexOf('#staff'), 1)[0]);
    this.setState({ tags });
  };

  toggleTag = tag => {
    console.log(tag);
    // Make a copy of current state activeTags
    const activeTags = [...this.state.activeTags];
    console.log(activeTags);
    // Add or remove tag from activeTags
    activeTags.includes(tag)
      ? activeTags.splice(activeTags.indexOf(tag), 1)
      : activeTags.push(tag);

    // this.filterSessionsByTag(activeTags);
    activeTags.length > 0
      ? this.setState({ activeSessions: this.filterSessionsByTag(activeTags) })
      : this.activateSessions(this.state.sessionNumber);

    this.setState({ activeTags }, () => {
      // Cause tags to Re-Render
      const tags = [...this.state.tags];
      console.log(tags);
      this.setState({ tags });
    });
  };

  render() {
    const { session } = this.props;
    const ACFData = this.props.pageContent.acf;

    const { activeTags, tags, sessionNumber, activeSessions } = this.state;
    console.log(activeSessions, tags);
    return (
      <Container>
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
            <GalleryContainer>
              {tags.length > 0 && (
                <TagContainer>
                  <h2>{sessionTimes[sessionNumber]}</h2>
                  <p>
                    Click on the tags below to filter the workshops by topic and audience
                  </p>
                  {tags.map((tag, i) => (
                    <Tag
                      key={i}
                      onClick={() => this.toggleTag(tag)}
                      active={activeTags.includes(tag)}
                    >
                      {tag}
                    </Tag>
                  ))}
                </TagContainer>
              )}
              {/* <Gallery elements={activeSessions} tags={tags} /> */}
            </GalleryContainer>{' '}
            <Column width={[1, 2 / 3]} order={[1, 2]} />
          </Row>
        </Section>
      </Container>
    );
  }
}

const GalleryContainer = styled.div``;

const TagContainer = styled.div`
  margin-bottom: 10px;

  h2 {
    margin-bottom: 10px;
    font-weight: bold;
  }
`;

const Tag = styled.span`
  display: inline-block;
  padding: 2px 6px;
  margin: 4px;
  background: ${props => (props.active ? 'rgb(40, 62, 85)' : 'rgb(193, 196, 197)')};
  color: ${props => (props.active ? 'white' : '#424242')};
  border-radius: 4px;
  font-size: 0.9em;
  cursor: pointer;
  transition: background 0.25s ease-out;

  &:hover {
    background: ${props => (props.active ? '#4e79a6' : '#efefef')};
  }
`;

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
