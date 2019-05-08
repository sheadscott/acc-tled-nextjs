import React from 'react';
import Axios from 'axios';
import Error from 'next/error';
import { endpoint } from '../config';
import Parser from '../components/Parser/Parser';

if (!Array.prototype.last) {
  Array.prototype.last = function() {
    return this[this.length - 1];
  };
}

const WPPage = ({ errorCode, pageContent, pageTitle }) => {
  if (errorCode) return <Error statusCode={errorCode} />;

  return (
    <div>
      <h1>{pageTitle}</h1>
      <div>
        <Parser>{pageContent}</Parser>
      </div>
    </div>
  );
};

WPPage.getInitialProps = async ({ asPath, res }) => {
  console.log(asPath);
  const slug = asPath
    .split('?')[0]
    .split('/')
    .last();

  const wpContent = await Axios.get(`${endpoint}wp/v2/pages?slug=${slug}`);

  const html = wpContent.data[0];
  const pageTitle = html.title.rendered;
  // console.log(html);

  if (res && html) {
    res.writeHead(200);
    // console.log('bingbong');
  }

  if (!html && res) {
    res.writeHead(404);
    wpContent.statusCode = 404;
  }

  const errorCode = wpContent.statusCode > 200 ? wpContent.statusCode : false;
  return {
    errorCode,
    pageContent: html.content.rendered,
    pageTitle,
  };
};

export default WPPage;
