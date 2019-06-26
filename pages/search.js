import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Parser from 'html-react-parser';
import Head from 'next/head';
import Link from 'next/link';
import { Container } from '../components/Grid/Grid';
import { Section, Heading } from '../components/Elements/Elements';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';

const breadcrumbData = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Search Results',
  },
];

class SearchPage extends Component {
  static async getInitialProps({ query }) {
    console.log(query);

    try {
      const results = await axios.get(
        `https://www.googleapis.com/customsearch/v1/?q=${
          query.search
        }&cx=012364290968804032782:hudrbtuxgi8&key=AIzaSyB_RsUE2sfirjPLyMpK8jvYeX45E0tBtvs`
      );
      // console.log(results.data.);
      return { results: results.data.items };
    } catch (e) {
      return { error: true };
    }
  }

  // This method updates state with the returned object
  // static getDerivedStateFromProps(nextProps, prevState){
  //   if(nextProps.query!==prevState.query){
  //     return { query: nextProps.query};
  //  }
  //   else return null;
  // }

  // static getDerivedStateFromProps(nextProps, prevState){
  //   const changedProps = nextProps.match.params.query!==prevState.query ?
  //     { query: nextProps.match.params.query }
  //     : null;
  //   return changedProps;
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   // this.setState({query: this.props.match.params.query}, this.getSearchResults);

  //   if (prevProps.match.params.query !== this.props.match.params.query) {
  //     this.setState({ query: this.props.match.params.query }, this.getSearchResults);
  //   }
  // }

  render() {
    const { results } = this.props;

    return (
      <Container>
        <Head>
          <title>Search Page</title>
        </Head>
        <Breadcrumbs data={breadcrumbData} />
        <Section>
          <Heading as="h1" caps underline>
            Search Results
          </Heading>
          {results &&
            results.map(result => (
              <SearchResult key={result.cacheId}>
                <Heading as="h2">
                  <Link href={result.link} hovercolor="purple">
                    <a>{result.title}</a>
                  </Link>
                </Heading>
                {Parser(result.htmlSnippet)}
              </SearchResult>
            ))}
        </Section>
      </Container>
    );
  }
}

export default SearchPage;

const SearchResult = styled.div`
  padding: 1rem 0;

  a {
    text-decoration: underline;
  }

  b {
    color: purple;
  }
`;
