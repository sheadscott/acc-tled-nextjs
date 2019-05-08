const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const isDev = process.env.STAGE === 'dev';
const target = isDev ? 'server' : 'serverless';
const assetPrefix = isDev ? '' : 'https://s3-us-west-2.amazonaws.com/austincc.xyz.totallyrandom';

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
        optimizeImagesInDev: true,
        responsive: {
          adapter: require('responsive-loader/sharp'),
          sizes: [180, 360, 600, 760, 1000],
        },
      },
    ],
  ],
  nextConfig
);
