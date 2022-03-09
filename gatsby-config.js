module.exports = {
  siteMetadata: {
    title: `WeedWeek`,
    siteUrl: `https://www.weedweek.pl`,
  },
  plugins: [
    'gatsby-plugin-root-import',
    `gatsby-plugin-sitemap`,
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        url: process.env.WPGRAPHQL_URL || 'https://admin.weedweek.pl/graphql/',
        schema: {
          perPage: 100, // currently set to 100
          requestConcurrency: 15, // currently set to 15
          previewRequestConcurrency: 5, // currently set to 5
        },
        develop: {
          hardCacheMediaFiles: true,
        },
        type: {
          Post: {
            // limit: process.env.NODE_ENV === `development` ? 20 : 5000,
            limit: 5000,
          },
          Tag: {
            limit: process.env.NODE_ENV === `development` ? 50 : 5000,
          },
        },
      },
    },
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/, // See below to configure properly
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
  ],
};
