import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Heading } from '../Elements/Elements';

export default class EventList extends Component {
  render() {
    const { length, events } = this.props;
    return (
      <MainWrapper>
        <Heading as="h2" caps mb="1.5rem" fontSize="1.3rem">
          Events & Important Dates
        </Heading>

        <EventWrapper>
          {events.slice(0, length - 1).map((event, i) => 
            // console.log(event);
             (
              <Event key={i}>
                {event.gsx$webdisplaydate.$t}
                {event.gsx$linktoregister.$t ? (
                  <Link href={event.gsx$linktoregister.$t}>
                    <a>{event.gsx$eventtitle.$t}</a>
                  </Link>
                ) : (
                  <span>{event.gsx$eventtitle.$t}</span>
                )}
              </Event>
            )
          )}
        </EventWrapper>

        <a href="/calendar">More Events ></a>
      </MainWrapper>
    );
  }
}

const MainWrapper = styled.div`
  background: #f1f1f1;
  padding: 2rem;
  height: 100%;
`;
const EventWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    margin-bottom: 1rem;
    font-weight: bold;
    a,
    span {
      margin-left: 1rem;
    }
  }
`;

const Event = styled.li``;
