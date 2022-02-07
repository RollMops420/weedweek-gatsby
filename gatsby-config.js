module.exports = {
  siteMetadata: {
      title: `WeedWeek`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [{
    resolve: 'gatsby-source-wordpress',
    options: {
      "url": "https://admin.weedweek.pl/graphql/"
    }
  }, "gatsby-plugin-styled-components", {
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      "trackingId": "UA-149509361-1"
    }
  }, "gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }]
};