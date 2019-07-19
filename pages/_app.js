import React from 'react';
import { ThemeProvider } from 'styled-components';
import App, { Container } from 'next/app';
import Axios from 'axios';
import Page from '../components/Page';
import Header from '../components/Header';
import Drawer from '../components/Drawer/Drawer';
import Search from '../components/Search/Search';
import TitleBar from '../components/TitleBar/TitleBar';
import SecondaryNav from '../components/SecondaryNav/SecondaryNav';
import Footer from '../components/Footer/Footer';
import { endpoint } from '../config';
import theme from '../theme';
import '../styles/foundation.scss';

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
    // if (ctx.query) {
    //   pageProps.query = ctx.query;
    // }
    return { pageProps: { ...pageProps }, navData, topNavData, footerData };
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
    // debugger;
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
    const expandedState = this.state.subMenuState.map((item, index, arr) => false);
    this.setState({ subMenuState: expandedState });
  };

  render() {
    const { Component, pageProps, navData, topNavData, footerData } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Header navData={navData}>
            <Drawer
              drawerState={this.state.drawerExpanded}
              toggleDrawer={this.toggleDrawer}
              titleBarItems={this.props.topNavData}
              secondaryNavItems={this.props.navData}
            />
            <Search
              searchExpanded={this.state.searchExpanded}
              searchSubmitted={this.searchSubmitted}
            />
            <TitleBar
              titleBarItems={topNavData}
              searchExpanded={this.state.searchExpanded}
              toggleSearch={this.toggleSearch}
              toggleDrawer={this.toggleDrawer}
            />
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
