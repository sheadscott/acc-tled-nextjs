import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AccessibleReactTable from 'accessible-react-table';
import 'react-table/react-table.css';
import { Container } from '../components/Grid/Grid';
import { Section, Heading } from '../components/Elements/Elements';

class MentorList extends Component {
  static async getInitialProps() {
    const sheetId = '18asi5EH_VkzWCP7kZV8filw-28Ajgjx6ny2eYr3ObEM';
    const formData = await axios.get(
      `https://spreadsheets.google.com/feeds/list/${sheetId}/2/public/values?alt=json`
    );
    const legacyData = await axios.get(
      `https://spreadsheets.google.com/feeds/list/${sheetId}/3/public/values?alt=json`
    );

    const legacyArray = legacyData.data.feed.entry;
    const formArray = formData.data.feed.entry;

    let currentMentor = '';

    const uniqueFormArray = formArray.filter(mentor => {
      const name =
        mentor.gsx$firstname.$t.trim().toLowerCase() +
        mentor.gsx$lastname.$t.trim().toLowerCase();
      const duplicate = currentMentor !== name;
      currentMentor = name;
      return duplicate;
    });

    console.log('LA length', legacyArray.length);
    const mentors = [...legacyArray, ...uniqueFormArray];
    return { mentors };
  }

  mentors = this.props.mentors;

  tableData = this.mentors.map(mentor => {
    const firstname = mentor.gsx$firstname.$t;
    const lastname = mentor.gsx$lastname.$t;
    const dept = mentor.gsx$departments.$t;
    const date = mentor.gsx$timestamp.$t;
    return { firstname, lastname, dept, date };
  });

  sortedTableData = this.tableData.sort((a, b) => {
    const nameA = a.lastname.toUpperCase(); // ignore upper and lowercase
    const nameB = b.lastname.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  componentDidMount() {
    this.addFilterPlaceholder();
  }

  addFilterPlaceholder = () => {
    const filters = document.querySelectorAll('div.rt-th > div > input');
    for (const filter of filters) {
      filter.placeholder = 'Search..';
    }
  };

  // const tableData = uniqueMentors.map(mentor => {

  // console.log('TABLEDATA: ', tableData);

  columns = [
    {
      Header: 'Last Name',
      accessor: 'lastname', // String-based value accessors!
      filterable: true,
    },
    {
      Header: 'First Name',
      accessor: 'firstname', // String-based value accessors!
    },
    {
      Header: 'Discipline',
      accessor: 'dept',
    },
    {
      Header: 'Orientation Date',
      accessor: 'date',
    },
  ];

  render() {
    return (
      <Container>
        <Section>
          <Heading as="h1" caps underline>
            ACC Faculty Mentor List
          </Heading>
          <AccessibleReactTable
            data={this.sortedTableData}
            className="-striped"
            columns={this.columns}
            defaultFilterMethod={(filter, row, column) => {
              const id = filter.pivotId || filter.id;
              return row[id] !== undefined
                ? String(row[id])
                    .toLowerCase()
                    .startsWith(filter.value.toLowerCase())
                : true;
            }}
          />
        </Section>
      </Container>
    );
  }
}

export default MentorList;

// `https://spreadsheets.google.com/feeds/list/18asi5EH_VkzWCP7kZV8filw-28Ajgjx6ny2eYr3ObEM/2/public/values?alt=json`
