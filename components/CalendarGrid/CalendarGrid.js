import React, { Component } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import Link from 'next/link';

export default class EventList extends Component {
  state = {
    events: [],
  };

  componentDidMount() {
    const sheetId = '1feRPiGXCX19MZofZ2LgLgYbvxpGJYFByhJ6ZAlOkWiM';
    Axios.get(`https://spreadsheets.google.com/feeds/list/${sheetId}/1/public/values?alt=json`).then(response => {
      const events = response.data.feed.entry;
      const filteredEvents = events
        .filter(event => new Date(event.gsx$dateforautocheck.$t.replace(/.*?,\s/, '')).valueOf() > Date.now())
        .sort((a, b) => {
          // Take the day of the week off the front of the string and convert to Date # value
          // Probably unnecessary since the events are returned in the order in sheet
          a = new Date(a.gsx$dateforautocheck.$t.replace(/.*?,\s/, '')).valueOf();
          b = new Date(b.gsx$dateforautocheck.$t.replace(/.*?,\s/, '')).valueOf();
          return a - b;
        });
      console.log(events);
      this.setState({ events: filteredEvents });
    });
  }

  render() {
    return (
      <Wrapper>
        {this.state.events.map((event, i) => (
          <Event key={i}>
            <Image image={event.gsx$image.$t}>{event.gsx$flag.$t && <Flag>{event.gsx$flag.$t}</Flag>}</Image>
            {event.gsx$webdisplaydate.$t}
            <h1>
              {event.gsx$linktoregister.$t ? (
                <Link href={event.gsx$linktoregister.$t}>
                  <a>{event.gsx$eventtitle.$t}</a>
                </Link>
              ) : (
                <span>{event.gsx$eventtitle.$t}</span>
              )
              // : {event.gsx$eventtitle.$t}
              }
            </h1>
          </Event>
        ))}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-left: -1rem;
  margin-right: -1rem;
  // &::after {
  //   content: "#";
  // }
`;
const Event = styled.div`
  flex: 1 1 200px;
  min-width: 200px;
  margin: 1rem;
  cursor: pointer;
  transition: all 0.1s;

  &:last-child {
    @media (max-width: 619px) {
      max-width: 100%;
    }
    max-width: 280px;
  }

  &:hover {
    transform: scale(0.99);
  }

  h1 {
    // color: blue;
    font-size: 1rem;
  }
`;

const Image = styled.div`
  height: 0;
  padding-bottom: 100%;
  width: 100%;
  // background: url('https://drive.google.com/thumbnail?id=1bvC4SRreXx3SKsBoj3ui6EphifhAB_dm&sz=w400') no-repeat top left;
  background: ${props => `url(${`${props.image}&sz=w400`}) no-repeat top left`};
  background-size: cover;
  display: flex;
  margin-bottom: 1rem;
`;

const Flag = styled.span`
  background-color: #000;
  color: #fff;
  font-size: 0.9rem;
  display: inline-block;
  text-align: center;
  padding: 0.6rem 1rem;
  margin-left: auto;
  margin-top: 1rem;
  height: fit-content;
  text-transform: uppercase;
`;
