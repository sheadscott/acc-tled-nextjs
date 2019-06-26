const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const withCSS = require('@zeit/next-css'); // Need for flickity
const withSass = require('@zeit/next-sass');

const stage = process.env.STAGE;
let assetPrefix = '';

if (stage === 'production') {
  assetPrefix = '';
} else if (stage === 'dev') {
  assetPrefix = 'https://d1n95ybjvje48l.cloudfront.net';
} else {
  assetPrefix = '';
}
const target = stage !== 'production' ? 'server' : 'serverless';

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
