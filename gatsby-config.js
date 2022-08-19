module.exports = {
  siteMetadata: {
    title: `WeedWeek`,
    siteUrl: `https://www.weedweek.pl`,
  },
  plugins: [
    'gatsby-plugin-root-import',
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-sitemap`,
    'gatsby-plugin-typescript',
    'gatsby-plugin-robots-txt',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        url: 'https://admin.weedweek.pl/graphql',
        schema: {
          perPage: 30, // currently set to 100
          requestConcurrency: 5, // currently set to 15
          previewRequestConcurrency: 1, // currently set to 5
          timeout: 60000,
        },
        develop: {
          hardCacheMediaFiles: true,
        },
        production: {
          hardCacheMediaFiles: true,
          allow404Images: true,
          allow401Images: true
        },
        type: {
          Post: {
            limit: process.env.NODE_ENV === `development` ? 20 : 5000,
            // limit: 50,
          },
          Tag: {
            limit: process.env.NODE_ENV === `development` ? 50 : 5000,
            // limit: 50,
          },
        },
      },
    },
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: false, // (default: true) Enable/disable loading stylesheets via CDN
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-149509361-1',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/assets/images/favicon.png',
      },
    },
  ],
};
