const path = require(`path`);
const axios = require(`axios`);
const { slash } = require(`gatsby-core-utils`);

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type WpPost implements Node @infer {
      related_posts: wpNodePost!
    }

    type wpNodePost implements Node {
      nodes: [WpPost]
    }
  `;
  createTypes(typeDefs);
};

const WORDPRESS_BASE = `https://admin.weedweek.pl`;

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const allPosts = await getNodes({ graphql, reporter });
  const allCategories = await getNodesCategories({ graphql, reporter });
  if (!allPosts.length || !allCategories.length) {
    return;
  }

  const postTemplate = path.resolve(`./src/templates/post.tsx`);
  const categoryTemplate = path.resolve(`./src/templates/category.tsx`);

  allCategories.forEach((category) => {
    createPage({
      path: category.uri,
      component: slash(categoryTemplate),
      context: {
        id: category.id,
        name: category.name,
      },
    });
  });

  allPosts.forEach(({ previous, post, next }) => {
    createPage({
      path: post.uri,
      component: slash(postTemplate),
      context: {
        id: post.id,
        previousPostId: previous ? previous.id : null,
        nextPostId: next ? next.id : null,
      },
    });
  });
};

async function getNodesCategories({ graphql, reporter }) {
  const graphqlResult = await graphql(`
    query WpCategories {
      allWpCategory {
        nodes {
          id
          name
          uri
        }
      }
    }
  `);

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog categories`,
      graphqlResult.errors
    );
    return;
  }

  return graphqlResult.data.allWpCategory.nodes;
}

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
async function getNodes({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPosts {
      # Query all WordPress blog posts sorted by date
      allWpPost(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }
          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            __typename
            id
            uri
          }
          next {
            id
          }
        }
      }
      allWpPage(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }
          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            __typename
            id
            uri
          }
          next {
            id
          }
        }
      }
    }
  `);

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    );
    return;
  }

  return [
    ...graphqlResult.data.allWpPost.edges,
    ...graphqlResult.data.allWpPage.edges,
  ];
}

exports.createResolvers = ({ createResolvers, schema }) =>
  createResolvers({
    WpPost: {
      related_posts: {
        resolve: async (source, args, context, info) => {
          const { databaseId } = source;
          const { data: response } = await axios.get(
            `${WORDPRESS_BASE}/wp-json/yarpp/v1/related/${databaseId}`
          );

          if (response && response.length) {
            const item = await context.nodeModel.runQuery({
              query: {
                filter: { databaseId: { in: response.map(({ id }) => id) } },
              },
              type: 'WpPost',
            });
            return { nodes: item };
          } else return { nodes: [] };
        },
      },
    },
  });
