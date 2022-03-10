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
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        url: process.env.WPGRAPHQL_URL || 'https://admin.weedweek.pl/graphql/',
        production: {
          allow404Images: true,
        },
        schema: {
          perPage: 15, // currently set to 100
          requestConcurrency: 3, // currently set to 15
          previewRequestConcurrency: 2, // currently set to 5
          timeout: 60000,
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
