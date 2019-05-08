import React from 'react';
import Axios from 'axios';
import Error from 'next/error';
import { endpoint } from '../config';
import Parser from '../components/Parser/Parser';

const Index = ({ pageContent, pageTitle }) => {
  if (!pageContent) return <Error status={404} />;
  return (
    <div>
      <h1>{pageTitle}</h1>
      <div>
        <Parser>{pageContent}</Parser>
      </div>
    </div>
  );
};

Index.getInitialProps = async ({ res, asPath }) => {
  const pageObject = Axios.get(`${endpoint}wp/v2/pages?slug=home`)
    .catch(function(error) {
      // handle error
      console.error('*** ERROR *** WPPage.js: ', error);
    })
    .then(response => {
      // console.log('Response: ', response);
      const html = response.data[0];
      // console.log(html);
      if (!html && res) {
        res.statusCode = 404;
        return {
          pageContent: null,
          pageTitle: null,
        };
      }
      let pageTitle = '';
      try {
        pageTitle = html.title.rendered;
      } catch (e) {
        console.log(e);
      }
      return {
        pageContent: html.content.rendered,
        pageTitle,
      };
    });

  return pageObject;
};

export default Index;
