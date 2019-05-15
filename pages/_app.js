import React from 'react';
import { ThemeProvider } from 'styled-components';
import App, { Container } from 'next/app';
import Axios from 'axios';
import Page from '../components/Page';
import Header from '../components/Header';
import TitleBar from '../components/TitleBar/TitleBar';
import SecondaryNav from '../components/SecondaryNav/SecondaryNav';
import Footer from '../components/Footer/Footer';
import { endpoint } from '../config';
import theme from '../theme';
import HomeSlider from '../components/HomeSlider/HomeSlider';

class MyApp extends App {
  state = {
    searchExpanded: false,
    drawerExpanded: false,
    subMenuState: [],
  };

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const topNavData = await Axios.get(`${endpoint}wp-api-menus/v2/menus/3`)
      .catch(function(error) {
        // handle error
        console.error('Main Nav', error);
      })
      .then(response => response.data.items);

    const navData = await Axios.get(`${endpoint}wp-api-menus/v2/menus/4`)
      .catch(function(error) {
        // handle error
        console.error('Main Nav', error);
      })
      .then(response => response.data.items);

    const footerData = await Axios.get(
      `https://instruction.austincc.edu/tled/wp-json/wp-api-menus/v2/menus/5`
    )
      .catch(function(error) {
        // handle error
        console.error('Footer', error);
      })
      .then(response => response.data.items);

    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps, navData, topNavData, footerData };
  }

  toggleSearch = event => {
    this.setState(prevState => ({
      searchExpanded: !prevState.searchExpanded,
    }));

    if (event) {
      event.preventDefault();
    }
  };

  searchSubmitted = () => {
    this.setState({ searchExpanded: false });
  };

  toggleDrawer = () => {
    this.setState(prevState => ({ drawerExpanded: !prevState.drawerExpanded }));
  };

  // toggle a menu item open or closed
  toggleSubMenu = (event, num) => {
    const expandedState = this.state.subMenuState.map((item, index, arr) => {
      if (index === num) {
        return !item;
      }
      return false;
    });
    this.setState({ subMenuState: expandedState });
    if (event) {
      event.stopPropagation();
    }
  };

  // close all menu items
  cancelSubMenuState = () => {
    const expandedState = this.state.subMenuState.map(
      (item, index, arr) => false
    );
    this.setState({ subMenuState: expandedState });
  };

  render() {
    const {
      Component,
      pageProps,
      navData,
      topNavData,
      footerData,
    } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Header navData={navData}>
            <TitleBar titleBarItems={topNavData} />
            <SecondaryNav
              secondaryNavItems={navData}
              subMenuState={this.state.subMenuState}
              toggleSubMenu={this.toggleSubMenu}
              cancelSubMenuState={this.cancelSubMenuState}
            />
          </Header>
          <Page>
            <Component {...pageProps} />
          </Page>
          <Footer footerData={footerData} />
        </Container>
      </ThemeProvider>
    );
  }
}

export default MyApp;
