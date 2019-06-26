import React from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { Container, Row, Column } from '../components/Grid/Grid';

import CalendarGrid from '../components/CalendarGrid/CalendarGrid';
import { Heading } from '../components/Elements/Elements';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';

const breadcrumbData = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Calendar',
  },
];

const CalendarPage = () => (
  <Wrapper>
    <Container>
      <Head>
        <title>TLED Calendar</title>
      </Head>
      <Breadcrumbs data={breadcrumbData} />
      <Row>
        <Column width={1}>
          <Heading as="h1" caps underline>
            Calendar
          </Heading>
          <ButtonContainer>
            <Link href="https://tled.austincc.edu/faculty-communications/">
              <a className="button">Submit Event</a>
            </Link>
          </ButtonContainer>
          <CalendarGrid />
        </Column>
      </Row>
    </Container>
  </Wrapper>
);

export default CalendarPage;

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  text-align: center;
  a {
    margin-top: 0.5rem;
    margin-bottom: 0;
    background: rgba(91, 43, 112, 1);
    border-radius: 4px;
    padding: 0.5rem 1rem;
    &:hover {
      background: rgba(91, 43, 112, 0.8);
    }
  }
`;
