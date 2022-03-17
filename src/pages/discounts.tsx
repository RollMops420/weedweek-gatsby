import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Container from 'components/Container';
import SEO from 'components/SEO';
import Button from 'components/Button';

const Grid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, 1fr);
  ${({ theme }) => theme.mq.m} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Discount = styled.div`
  width: 100%;
`;

const Image = styled(GatsbyImage)`
  position: relative;
`;

const Code = styled.span`
  display: block;
  color: white;
`;

const Discounts = ({ data }: any) => {
  const { discounts } = data;

  return (
    <>
      <SEO title="Promocje / Rabaty - WeedWeek" />
      <Container top>
        <Grid>
          {discounts.edges.map(({ node }: any) => (
            <a
              key={node.id}
              href={node.discount.link}
              target="_blank"
              rel="noopener"
            >
              <Discount>
                <Image
                  image={getImage(
                    node.featuredImage.node.localFile.childImageSharp
                      .gatsbyImageData
                  )}
                  alt={node.featuredImage.node.altText}
                />
                <Code>KOD RABATOWY: {node.discount.promoCode}</Code>
                <Code>PROMOCJA: {node.discount.discount}</Code>
                <Button>Przejdź do promocji</Button>
              </Discount>
            </a>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export const pageQuery = graphql`
  query {
    discounts: allWpDiscount {
      edges {
        node {
          id
          featuredImage {
            node {
              sourceUrl
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
          discount {
            link
            promoCode
            discount
          }
        }
      }
    }
  }
`;

export default Discounts;
