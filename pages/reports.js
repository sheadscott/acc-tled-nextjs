import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { Container, Row, Column } from '../components/Grid/Grid';
import ReportsGrid from '../components/ReportsGrid/ReportsGrid';
import { Heading } from '../components/Elements/Elements';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';

const breadcrumbData = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Reports',
  },
];

export default function CalendarPage() {
  return (
    <Wrapper>
      <Head>
        <title>Reports</title>
      </Head>
      <Container>
        <Breadcrumbs data={breadcrumbData} />
        <Row>
          <Column width={1}>
            <Heading as="h1" caps underline>
              TLED EXECUTIVE REPORT
            </Heading>
            <Heading as="h3" className="subhead">
              Timely updates for enhanced internal communication.
            </Heading>
            <ReportsGrid />
          </Column>
        </Row>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;

  h3.subhead {
    font-size: 1.2rem;
    font-weight: normal;
    padding: 1rem 0;
  }
`;
