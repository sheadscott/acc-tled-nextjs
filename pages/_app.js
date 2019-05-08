import React from 'react';
import App, { Container } from 'next/app';
import Axios from 'axios';
import Page from '../components/Page';
import { endpoint } from '../config';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const navData = await Axios.get(`${endpoint}wp-api-menus/v2/menus/2`)
      .catch(function(error) {
        // handle error
        console.error('Main Nav', error);
      })
      .then(
        response =>
          // console.log(response.data.items);
          response.data.items
      );

    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps, navData };
  }

  render() {
    const { Component, pageProps, router } = this.props;
    console.log('Router: ', router.asPath);

    const handleRouteChange = url => {
      console.log('App is changing to: ', url);
    };

    // router.onPopState(handleRouteChange);

    return (
      <Container>
        <Page navData={this.props.navData}>
          <Component {...pageProps} />
        </Page>
      </Container>
    );
  }
}

export default MyApp;
