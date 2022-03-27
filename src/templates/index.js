import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
// import client, { gql } from 'utils/graphql';
import SEO from 'components/SEO';
import Container from 'components/Container';
import Featured from 'components/Featured';
import Button from 'components/Button';
import Posts from 'components/Posts';
import PostSmall from 'components/Post';
import Section from 'components/Section';
import SquareAd from 'components/Ads/SquareAd';
import AdWrapper from 'components/Ads/AdWrapper';
import WideAd from 'components/Ads/WideAd';
import GifAd from 'components/Ads/GifAd';
import PostsDesc from 'components/PostsDesc';
import Products from 'components/Products';
import PopupAd from 'components/Ads/PopupAd';
import { StaticImage } from 'gatsby-plugin-image';
import CalendarWebM from '../assets/images/kalendarz.webm';
import CalendarMP4 from '../assets/images/kalendarz.mp4';

const ShopSection = styled(Section)`
  background-color: ${({ theme }) => theme.secondary};
`;

const ShopWrapper = styled.div`
  ${({ theme }) => theme.mq.m} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  margin-bottom: 15px;
`;

const ShopImageWrapper = styled.div`
  display: flex;
`;

const ShopImage = styled(StaticImage)`
  border-radius: 10px;
  background-color: white;
`;

const ShopDesc = styled.div`
  margin-left: 15px;
  & h4 {
    margin: 0;
    margin-bottom: 5px;
  }
`;

const ShopButton = styled.a`
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.third};
  color: #222;
  text-align: center;
  border-radius: 10px;
  text-transform: uppercase;
  margin-top: 10px;
  ${({ theme }) => theme.mq.m} {
    margin-top: 0;
  }
`;

const ShopLink = styled.a`
  display: inline-block;
  color: ${({ theme }) => theme.link};
`;

const StyledAdWrapper = styled(AdWrapper)`
  ${({ theme }) => theme.mq.l} {
    margin-bottom: 0;
  }
`;

const PestkaWide = styled.div`
  display: none;
  ${({ theme }) => theme.mq.l} {
    display: block;
  }
`;

const PestkaSquare = styled.div`
  display: block;
  ${({ theme }) => theme.mq.l} {
    display: none;
  }
`;

const HomePage = ({ data }) => {
  const { first, posts, nasiona, products, adA, adB, adC } = data;
  const popular = posts;
  const medyczna = data.medyczna;
  const waporyzacja = data.waporyzacja;

  const [articles, setArticles] = useState(posts ? data.posts.edges : []);
  const [page, setPage] = useState(0);

  // const [bannerVisible, setBanner] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (bannerVisible === 0) setBanner(1);
  //     if (bannerVisible === 1) setBanner(0);
  //   }, 3000);

  //   return () => clearInterval(interval);
  // });

  // const loadMoreHandler = async () => {
  //   const {
  //     data: { posts },
  //   } = await client.query({
  //     query: gql`
  //       query posts {
  //         posts(where: {offsetPagination: {offset: ${
  //           (page + 1) * 10
  //         }, size: 10}}) {
  //           edges {
  //             node {
  //               title
  //               id
  //               categories {
  //                 nodes {
  //                   id
  //                   name
  //                 }
  //               }
  //               featuredImage {
  //                 node {
  //                   sourceUrl
  //                 }
  //               }
  //               slug
  //               excerpt
  //               date
  //             }
  //           }
  //           pageInfo {
  //             offsetPagination {
  //               hasMore
  //             }
  //           }
  //         }
  //       }
  //     `,
  //   });
  //   setArticles((prevState) => [...prevState, ...posts.edges]);
  //   setPage(page + 1);
  // };
  return (
    <>
      <SEO
        title="WeedWeek | Portal Konopny"
        desc="WEEDWEEK.PL - Najnowsze newsy ze świata konopi. Marihuana medyczna, marihuana rekreacyjna i konopie przemysłowe."
        keywords="weedweek, marihuana, weed, 420, waporyzacja, konopie, cbd"
      />
      <Container full>
        <Section title="Najnowsze" small>
          <div>
            <Featured post={first.edges[0]} />
            {/* <a href={adC.ad_fields.link}>
              <img src={adC.featuredImage.node.sourceUrl} />
            </a> */}
            <a
              target="blank"
              href="https://rollmops.pl/rollmops-2/420-calendar-2022?utm_source=weedweek.pl"
            >
              <StyledAdWrapper>
                <video
                  playsInline
                  autoPlay
                  muted
                  loop
                  style={{ width: '100%', borderRadius: 10 }}
                >
                  <source src={CalendarWebM} type="video/webm" />
                  <source src={CalendarMP4} type="video/mp4" />
                </video>
              </StyledAdWrapper>
            </a>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {posts.edges.map((post, index) => {
              if (index > 6) return null;
              return <PostSmall post={post} key={index} circle />;
            })}
          </div>
        </Section>
        <Section full title="Produkty" style={{ paddingRight: 0 }}>
          <Products products={products.edges} />
        </Section>
        <PestkaSquare>
          <a
            target="blank"
            href="https://panpestka.pl/bestsellery/?wpam_id=9"
            style={{
              display: 'block',
              margin: '0 auto',
              marginBottom: 20,
              width: 200,
              height: 200,
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            <StaticImage
              src="../assets/images/pestkakwadrat.jpeg"
              alt="Pan Pestka"
              width={200}
              height={200}
            />
          </a>
        </PestkaSquare>
        <PestkaWide>
          <a
            target="blank"
            href="https://panpestka.pl/bestsellery/?wpam_id=9"
            style={{
              display: 'block',
              margin: '0 auto',
              marginBottom: 20,
              maxWidth: 1200,
              maxHeight: 400,
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            <StaticImage
              src="../assets/images/pestkawide.jpg"
              alt="Pan Pestka"
              width={1200}
              height={400}
            />
          </a>
        </PestkaWide>
        {/* <WideAd
          href={adC.ad_fields.link}
          source={
            adC.featuredImage.node.localFile.childImageSharp.gatsbyImageData
          }
        /> */}
        {/* <AdWrapper>
          {bannerVisible === 0 && adE.featuredImage && (
            <WideAd
              href={adE.ad_fields.link}
              source={adE.featuredImage.node.sourceUrl}
            />
          )}
          {bannerVisible === 1 && adC.featuredImage && (
            <WideAd
              href={adC.ad_fields.link}
              source={adC.featuredImage.node.sourceUrl}
            />
          )}
        </AdWrapper> */}
        <Section full title="Popularne">
          <Posts wide posts={popular.edges.slice(0, 8)} />
        </Section>
        <ShopSection full title="Nasiona Marihuany">
          <ShopWrapper>
            <ShopImageWrapper>
              <div
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  padding: '0 2px',
                }}
              >
                <StaticImage
                  width={60}
                  height={67}
                  src="../assets/images/panpestka.png"
                />
              </div>

              <ShopDesc>
                <h4>Kącik Ornitologiczny</h4>
                <span>
                  Wspierany przez{' '}
                  <ShopLink
                    target="blank"
                    href="https://panpestka.pl/bestsellery/?wpam_id=9"
                  >
                    PanPestka.pl
                  </ShopLink>
                </span>
              </ShopDesc>
            </ShopImageWrapper>
            {/* <ShopButton
              href="mailto:mops@rollmops.pl"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Zostań partnerem
            </ShopButton> */}
          </ShopWrapper>
          <Posts posts={nasiona.edges.slice(0, 4)} />
        </ShopSection>
        {/* <AdWrapper square>
          {adB.featuredImage && (
            <SquareAd
              href={adB.ad_fields.link}
              source={adB.featuredImage.node.sourceUrl}
            />
          )}
        </AdWrapper> */}
        <Section full title="Medyczna Marihuana">
          <Posts posts={medyczna.edges} />
        </Section>
        <Section small title="Wszystkie wpisy">
          <div>
            <PostsDesc posts={posts.edges.slice(8, 50)} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {waporyzacja.edges.map((post, index) => (
              <PostSmall post={post} key={index} circle />
            ))}
          </div>
        </Section>
      </Container>
      {adB.featuredImage && (
        <PopupAd
          source={
            adB.featuredImage.node.localFile.childImageSharp.gatsbyImageData
          }
          href={adB.ad_fields.link}
        />
      )}
      {/* <PopupAd
        banners={[
          {
            href: adB.ad_fields.link,
            source: adB.featuredImage.node.sourceUrl,
          },
          // {
          //   href: adE.ad_fields.link,
          //   source: adE.featuredImage.node.sourceUrl,
          // },
        ]}
      /> */}
    </>
  );
};

export const pageQuery = graphql`
  query {
    first: allWpPost(limit: 1, sort: { order: DESC, fields: date }) {
      edges {
        node {
          excerpt
          author {
            node {
              firstName
              lastName
            }
          }
          title
          categories {
            nodes {
              slug
              name
            }
          }
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 800)
                }
              }
            }
          }
          slug
          excerpt
          date
        }
      }
      pageInfo {
        hasNextPage
      }
    }
    posts: allWpPost(skip: 1, limit: 50, sort: { order: DESC, fields: date }) {
      edges {
        node {
          excerpt
          author {
            node {
              firstName
              lastName
            }
          }
          title
          categories {
            nodes {
              slug
              name
            }
          }
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 128)
                }
              }
            }
          }
          slug
          excerpt
          date
        }
      }
      pageInfo {
        hasNextPage
      }
    }
    allWpCategory(filter: { count: { gt: 1 } }) {
      edges {
        node {
          slug
          name
        }
      }
    }
    adA: wpAd(title: { eq: "A" }) {
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
    adB: wpAd(title: { eq: "B" }) {
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 512)
            }
          }
        }
      }
      ad_fields {
        link
      }
    }
    adC: wpAd(title: { eq: "C" }) {
      featuredImage {
        node {
          sourceUrl
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
    adE: wpAd(title: { eq: "E" }) {
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
    medyczna: allWpPost(
      filter: {
        categories: {
          nodes: { elemMatch: { slug: { eq: "medyczna-marihuana" } } }
        }
      }
      sort: { order: DESC, fields: date }
      limit: 8
    ) {
      edges {
        node {
          excerpt
          title
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 512)
                }
              }
            }
          }
          categories {
            nodes {
              slug
              name
            }
          }
          slug
        }
      }
    }
    nasiona: allWpPost(
      filter: {
        categories: {
          nodes: { elemMatch: { slug: { eq: "nasiona-marihuany" } } }
        }
      }
      sort: { order: DESC, fields: date }
    ) {
      edges {
        node {
          excerpt
          title
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 512)
                }
              }
            }
          }
          categories {
            nodes {
              slug
              name
            }
          }
          slug
        }
      }
    }
    waporyzacja: allWpPost(
      filter: {
        categories: { nodes: { elemMatch: { slug: { eq: "waporyzacja" } } } }
      }
      sort: { order: DESC, fields: date }
    ) {
      edges {
        node {
          excerpt
          title
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 256)
                }
              }
            }
          }
          categories {
            nodes {
              slug
              name
            }
          }
          slug
        }
      }
    }
    products: allWpProduct {
      edges {
        node {
          id
          details {
            price
            review {
              ... on WpPost {
                id
                slug
              }
            }
            shop
          }
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
          title
        }
      }
    }
  }
`;

export default HomePage;
