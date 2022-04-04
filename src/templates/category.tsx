import React from 'react';
import { graphql } from 'gatsby';
import SEO from 'components/SEO';
import Container from 'components/Container';
import Section from 'components/Section';
import Post from 'components/PostCategory';
import AdWrapper from 'components/Ads/AdWrapper';
import SquareAd from 'components/Ads/SquareAd';
import { StaticImage } from 'gatsby-plugin-image';

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
        {name !== 'Uprawa' && (
          <a
            href="https://www.hesi.nl/pl?utm_source=weedweek.pl"
            style={{ borderRadius: 10, overflow: 'hidden', marginBottom: 10 }}
            target="blank"
          >
            <StaticImage src="../assets/images/hesiwide.png" alt="Hesi" />
          </a>
        )}
        {name === 'Uprawa' && (
          <a
            href="https://www.hesi.nl/pl?utm_source=weedweek.pl"
            target="blank"
          >
            <div>
              <h3>DZIAŁ UPRAWA POWSTAŁ DZIĘKI WSPÓŁPRACY Z HESI </h3>{' '}
              <StaticImage src="../assets/images/hesiwide.png" alt="Hesi" />
            </div>
          </a>
        )}
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
