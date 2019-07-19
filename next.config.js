const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const withCSS = require('@zeit/next-css'); // Need for flickity
const withSass = require('@zeit/next-sass');

const stage = process.env.STAGE;

const assetPrefix = stage === 'dev' ? 'https://d1n95ybjvje48l.cloudfront.net' : '';
const target = stage === 'dev' ? 'serverless' : 'server';

const nextConfig = {
  assetPrefix,
  target,
};

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        handleImages: ['jpeg', 'png', 'svg'],
        inlineImageLimit: -1,
        optimizeImagesInDev: true,
        responsive: {
          adapter: require('responsive-loader/sharp'),
          sizes: [180, 360, 600, 760, 1000],
        },
      },
    ],
    [withCSS],
    [withSass],
  ],
  nextConfig
);
