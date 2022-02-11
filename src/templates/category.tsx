import React from 'react';
import { graphql } from 'gatsby';
import SEO from 'components/SEO';
import Container from 'components/Container';
import Section from 'components/Section';
import Post from 'components/PostCategory';
import AdWrapper from 'components/Ads/AdWrapper';
import SquareAd from 'components/Ads/SquareAd';

const CategoryPage = ({ data, pageContext: { name } }) => {
  const { adB, posts } = data;

  return (
    <>
      <SEO title={`${name} - WeedWeek`} />
      <AdWrapper square>
        {adB.featuredImage && (
          <SquareAd
            href={adB.ad_fields.link}
            source={adB.featuredImage.node.sourceUrl}
          />
        )}
      </AdWrapper>
      <Container top>
        <Section title={name} full>
          {posts.edges.map((post) => (
            <Post key={post.node.id} post={post} />
          ))}
        </Section>
      </Container>
    </>
  );
};

export const pageQuery = graphql`
  query PostsByCategory($id: String!) {
    posts: allWpPost(
      filter: { categories: { nodes: { elemMatch: { id: { eq: $id } } } } }
    ) {
      edges {
        node {
          author {
            node {
              firstName
              lastName
            }
          }
          title
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
          slug
          excerpt
          date
        }
      }
    }
    adB: wpAd(title: { eq: "B" }) {
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
      ad_fields {
        link
      }
    }
  }
`;

export default CategoryPage;
