import React, { Component } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import Head from 'next/head';
import { Container } from '../components/Grid/Grid';
import { Section, Heading } from '../components/Elements/Elements';
import TLEDStaff from '../components/Directory/TLEDStaff';
import LibraryStaff from '../components/Directory/LibraryStaff';
import Parser from '../components/Parser/Parser';

export default class StaffDirectoryPage extends Component {
  state = {};

  tledSheetId = '1hPYNTqMM-lQuiMNNYfOj2g6NfUhsnZoDb8eaVDodyd0';

  libSheetId = '1pchnW3O4xtOB_GGU7fJsbqzYTc4nOucBlqf7gx2gOhw';

  tledSheets = {
    tled: [1, 'Teaching & Learning Excellence Division'],
    media: [3, 'Media Support Services'],
    multimedia: [4, 'Multimedia & Classroom Technology'],
    curriculumdev: [6, 'Office of Curriculum Development'],
    facdev: [2, 'Office of Faculty & Instructional Development'],
    internships: [7, 'Office of Experiential Learning'],
    instructionaltech: [5, 'Office of Instructional Technology'],
  };

  libSheets = {
    main: [1, "Dean's Office"],
    cyp: [2, 'Cypress Creek'],
    elg: [3, 'Elgin'],
    evc: [4, 'Eastview'],
    hlc: [5, 'Highland'],
    hys: [6, 'Hays'],
    nrg: [7, 'Northridge'],
    rrc: [8, 'Round Rock'],
    rvs: [9, 'Riverside'],
    sac: [10, 'South Austin'],
    sgc: [11, 'San Gabriel'],
    techservices: [12, 'Technical Services'],
  };

  componentDidMount() {
    // Get the named anchor ie. #tled
    // const { hash } = this.props.location;
    // if (hash) {
    //   const hashName = hash.replace(/^#/, '');
    //   this.setState({ expanded: hashName });
    //   if (hash !== '#library') {
    //     this.handleClick(null, hashName, this.tledSheets, this.tledSheetId);
    //   }
    // }
  }

  static getInitialProps({ req }) {
    let expanded = '';
    if (!req) {
      expanded = window.location.hash;
    }

    return { expanded };
  }

  handleClick(e, sheet, sheets, sheetId) {
    const deptContainer = this[`${sheet}Ref`];
    if (!this.state[sheet]) {
      // Disable onclick while loading
      deptContainer.style.cssText = 'pointer-events: none;';

      Axios.get(
        `https://spreadsheets.google.com/feeds/list/${sheetId}/${
          sheets[sheet][0]
        }/public/values?alt=json`
      )
        .catch(function(error) {
          // handle error
          console.error('*** ERROR *** StaffDirectoryPage.js: ', error);
        })
        .then(response => {
          const title = sheets[sheet][1];
          const staffData = response.data.feed.entry;
          this.setState({ [sheet]: { title, staffData } }, () => {
            // Re-enable onclick
            deptContainer.style.cssText = 'pointer-events: auto;';
            deptContainer.querySelector('.loading').classList.add('loaded');
            deptContainer.classList.toggle('active');
          });
        });
    } else {
      deptContainer.classList.toggle('active');
    }
  }

  render() {
    const title = 'TLED Staff Directory';

    return (
      <Container>
        <Head>
          <title>{title}</title>
        </Head>
        <Section>
          <Heading as="h1" caps underline ref={el => (this.heading = el)}>
            {title}
          </Heading>

          <Accordion>
            {Object.keys(this.tledSheets).map((sheet, index) => (
              // console.log(sheet + "Ref");
              <div id={sheet} ref={el => (this[`${sheet}Ref`] = el)} key={sheet}>
                <AccordionItem
                  key={index}
                  expanded={this.state.expanded === sheet}
                  onClick={e => {
                    this.handleClick(e, sheet, this.tledSheets, this.tledSheetId);
                  }}
                >
                  <StyledAccordionItemHeading>
                    <AccordionItemButton>
                      {this.tledSheets[sheet][1]}
                      <ArrowIcon>
                        <Parser>{require('../images/arrowDown.svg?include')}</Parser>
                      </ArrowIcon>
                    </AccordionItemButton>
                  </StyledAccordionItemHeading>
                  <StyledAccordionItemPanel>
                    <Loading className="loading">Loading...</Loading>
                    {this.state[sheet] && (
                      <Department>
                        {this.state[sheet].staffData && (
                          <TLEDStaff data={this.state[sheet].staffData} />
                        )}
                      </Department>
                    )}
                  </StyledAccordionItemPanel>
                </AccordionItem>
              </div>
            ))}

            {/* ##### Library ##### */}

            <AccordionItem id="library" expanded={this.state.expanded === 'library'}>
              <StyledAccordionItemHeading>
                <AccordionItemButton>
                  Library Services
                  <ArrowIcon>
                    <Parser>{require('../images/arrowDown.svg?include')}</Parser>
                  </ArrowIcon>
                </AccordionItemButton>
              </StyledAccordionItemHeading>
              <StyledAccordionItemPanel>
                <Accordion>
                  {Object.keys(this.libSheets).map(sheet => (
                    <div id={sheet} ref={el => (this[`${sheet}Ref`] = el)} key={sheet}>
                      <AccordionItem
                        onClick={e => {
                          this.handleClick(e, sheet, this.libSheets, this.libSheetId);
                        }}
                      >
                        <StyledAccordionItemHeading>
                          <AccordionItemButton>
                            {this.libSheets[sheet][1]}
                            <ArrowIcon>
                              <Parser>
                                {require('../images/arrowDown.svg?include')}
                              </Parser>
                            </ArrowIcon>
                          </AccordionItemButton>
                        </StyledAccordionItemHeading>
                        <StyledAccordionItemPanel>
                          <Loading className="loading">Loading...</Loading>
                          {this.state[sheet] && (
                            <Department>
                              {this.state[sheet].staffData && (
                                <LibraryStaff data={this.state[sheet].staffData} />
                              )}
                            </Department>
                          )}
                        </StyledAccordionItemPanel>
                      </AccordionItem>
                    </div>
                  ))}
                </Accordion>
              </StyledAccordionItemPanel>
            </AccordionItem>
          </Accordion>
        </Section>
      </Container>
    );
  }
}

const Department = styled.table`
  margin-bottom: 1rem;
  padding: 0;
  font-size: 1rem;

  thead tr {
    background: #666;
    color: white;
    cursor: pointer;
  }

  tbody {
    transition: opacity 0.4s;
    opacity: 1;

    &.preactive {
      display: table-row-group;
    }
  }

  a {
    text-decoration: underline;
  }

  td.phone {
    min-width: 140px;
  }
`;

const Loading = styled.div`
  margin-bottom: 1rem;
  &.loaded {
    display: none;
  }
`;

const StyledAccordionItemHeading = styled(AccordionItemHeading)`
  color: ${props => props.theme.colors.primaryBlue};
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #e6e6e6;
  position: relative;
  cursor: pointer;

  .accordion__button {
    padding: 1.25rem 1rem;
  }

  &:hover {
    background-color: #e6e6e6;
  }

  &:focus {
    outline: none;
    background-color: #e6e6e6;
  }

  &:before {
    font-size: 1.3rem;
    font-weight: 700;
    margin-top: -0.55rem;
  }

  div.accordion__button[aria-expanded='true'] span svg {
    transform: scaleY(-1);
  }
`;

const StyledAccordionItemPanel = styled(AccordionItemPanel)`
  padding: 1rem;
  border-bottom: 1px solid #e6e6e6;

  &.accordion__body {
    padding: 20px;
    display: block;
    animation: fadein 0.35s ease-in;
  }

  &.accordion__body--hidden {
    display: none;
    opacity: 0;
    animation: fadein 0.35s ease-in;
  }
`;

const ArrowIcon = styled.span`
  svg {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2rem;
    transition: transform 0.3s ease-out;

    path:first-child {
      fill: ${props => props.theme.colors.primaryBlue};
    }
  }
`;
