import React, { useEffect, useState, useRef, useContext } from 'react';
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled, { ThemeContext } from 'styled-components';
import useInView from 'react-cool-inview';
import Spinner from 'react-spinner-material';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import axios from 'axios';
import SEO from 'components/SEO';
import Container from 'components/Container';
import PostSmall from 'components/Post';
import Posts from 'components/Posts';
import Category from 'components/Category';
import Section from 'components/Section';
import CalendarSVG from '../assets/icons/calendar.svg';
import EyeSVG from '../assets/icons/eye.svg';
/* Ads */
import WideAd from 'components/Ads/WideAd';
import GifAd from 'components/Ads/GifAd';
import SquareAd from 'components/Ads/SquareAd';
import { ICategory } from 'types/types';
import AdWrapper from 'components/Ads/AdWrapper';
import useInterval from 'utils/useinterval';
import PopupAd from 'components/Ads/PopupAd';
import VideoPlayer from '../components/VideoPlayer';
import Disqus from '../components/Disqus';
import { graphql } from 'gatsby';
import Products from 'components/Products';
import HesiSquare from 'components/Ads/HesiSquare';

dayjs.locale('pl');

interface Ad {
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  } | null;
  ad_fields: {
    link: string;
  };
}

interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  categories: {
    nodes: [
      {
        name: string;
        slug: string;
      }
    ];
  };
  date: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  tags: {
    nodes: [
      {
        name: string;
      }
    ];
  };
  wpisy?: {
    videoLink?: string | null;
    wpbPostViewsCount?: string | null;
  };
  seo: {
    metaDesc: string;
    metaKeywords: string;
    opengraphDescription: string;
    opengraphTitle: string;
    opengraphType: string;
    title: string;
  };
  postId: string;
}

interface Props {
  post: Post;
  posts: any;
  adB: Ad;
  adC: Ad;
  adE: Ad;
  adF: Ad;
  categories: {
    edges: ICategory[];
  };
  newests: any;
  odmiany: any;
}

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const StyledCategory = styled(Category)`
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 100%
  );
  color: white;
  margin: 0 5px 10px 5px;
`;

const Date = styled.strong`
  margin-left: 5px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Info = styled.div`
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const Views = styled.strong`
  margin-bottom: 10px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  border-radius: 10px;
  overflow: hidden;
`;

const ImageOwn = styled.img`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h1`
  color: ${({ theme }) => theme.text};
  padding: 0 10px;
  margin: 0;
  font-size: ${({ theme }) => theme.font.size.m};
  ${({ theme }) => theme.mq.l} {
    font-size: ${({ theme }) => theme.font.size.ml};
  }
`;

const Content = styled.div`
  max-width: 100%;
  margin-bottom: 10px;
  & img {
    max-width: 100%;
    height: auto;
  }
  & a {
    color: #07a9b8;
    display: inline-block;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column-reverse;
  ${({ theme }) => theme.mq.l} {
    flex-direction: column;
  }
`;

const StickySection = styled.div`
  ${({ theme }) => theme.mq.m} {
    height: 700px;
  }
`;

const Sticky = styled.div`
  position: sticky;
  ${({ theme }) => theme.mq.m} {
    top: 150px;
  }
  ${({ theme }) => theme.mq.l} {
    top: 100px;
  }
`;

const ShopSection = styled(StickySection)`
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 10px;
  padding: 3px;
  margin-bottom: 10px;
`;

const ShopWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ShopDesc = styled.div`
  margin-left: 10px;
  flex: 1;
`;

const ShopButton = styled.a`
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.third};
  color: #222;
  text-align: center;
  border-radius: 10px;
  text-transform: uppercase;
  margin-top: 10px;
  font-size: 14px;
  ${({ theme }) => theme.mq.m} {
    margin-top: 0;
  }
  width: 100%;
`;

const RightWrapper = styled.div`
  position: relative;
  display: none;
  ${({ theme }) => theme.mq.m} {
    display: block;
  }
`;

const RightWrapperMobile = styled.div`
  position: relative;
  ${({ theme }) => theme.mq.m} {
    display: none;
  }
`;

const RenderPost = ({
  post,
  products,
  views,
  bannerVisible,
  adC,
  adE,
}: {
  post: Post;
  products: any;
  views: string | null;
  bannerVisible: number;
  adC: any;
  adE: any;
}) => (
  <div>
    {adC.featuredImage && (
      <AdWrapper style={{ display: bannerVisible === 0 ? 'block' : 'none' }}>
        <GifAd
          href={adC.ad_fields.link}
          source={adC.featuredImage.node.sourceUrl}
        />
      </AdWrapper>
    )}
    {adE.featuredImage && (
      <AdWrapper
        style={{
          display: bannerVisible === 1 ? 'block' : 'none',
        }}
      >
        <a
          href="https://vaporshop.pl/pl/117-420vape?utm_source=weedweek.pl"
          style={{
            display: 'block',
            width: '100%',
            borderRadius: 10,
            overflow: 'hidden',
          }}
          target="blank"
        >
          <StaticImage
            layout="fullWidth"
            src="../assets/images/420vape.png"
            alt="420Vape"
          />
        </a>
      </AdWrapper>
    )}
    <Row>
      {post.categories.nodes.map(({ name, slug }) => (
        <StyledCategory key={slug} slug={slug}>
          {name}
        </StyledCategory>
      ))}
      <Info>
        <span style={{ marginBottom: 9 }}>
          <CalendarSVG />
        </span>
        <Date>{dayjs(post.date).format('DD MMMM YYYY')}</Date>
      </Info>
      {views && (
        <Info>
          <span style={{ marginBottom: 9 }}>
            <EyeSVG />
          </span>
          <Date>{views}</Date>
        </Info>
      )}
    </Row>
    <Heading>{post.title}</Heading>
    <ImageWrapper>
      {post.wpisy?.videoLink ? (
        <div style={{ position: 'relative', paddingBottom: '56.25%' }}>
          {post.wpisy.videoLink.includes('cda') ? (
            <iframe
              src={post.wpisy.videoLink}
              style={{
                border: 'none',
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}
              frameBorder="0"
              scrolling="no"
              allowFullScreen
              name="v2"
              allow="encrypted-media"
            ></iframe>
          ) : (
            <VideoPlayer link={post.wpisy.videoLink} />
          )}
        </div>
      ) : (
        // <div style={{ position: 'relative', paddingBottom: '55%' }}>
        post.featuredImage?.node?.localFile && (
          <div style={{ maxWidth: '100%' }}>
            <GatsbyImage
              image={getImage(
                post.featuredImage.node.localFile.childImageSharp
                  .gatsbyImageData
              )}
              alt={post.featuredImage.node.altText}
            />
          </div>
        )
        // </div>
      )}
    </ImageWrapper>
    {/* {post.content && (
      <Content
        dangerouslySetInnerHTML={{
          __html: post.content.substring(0, post.content.indexOf('</strong>')),
        }}
      />
    )}
    <AdWrapper>
      <a
        href="https://www.hesi.nl/pl?utm_source=weedweek.pl"
        style={{ borderRadius: 10, overflow: 'hidden', marginBottom: 10 }}
        target="blank"
      >
        <StaticImage src="../assets/images/hesiwide.png" alt="Hesi" />
      </a>
    </AdWrapper> */}
    {post.content && (
      <Content
        dangerouslySetInnerHTML={{
          __html: post.content.substring(
            0
            post.content.indexOf('</h3>')
          ),
        }}
      />
    )}
    {post.content && (
      <>
        <Content
          dangerouslySetInnerHTML={{
            __html: post.content.substring(
              post.content.indexOf('</h3>'),
              post.content.lastIndexOf('<strong>')
            )
          }}
        />
        {/* <Products products={products.edges} /> */}

        {bannerVisible === 0 && adC.featuredImage && (
          <AdWrapper>
            <GifAd
              href={adC.ad_fields.link}
              source={adC.featuredImage.node.sourceUrl}
            />
          </AdWrapper>
        )}
        {bannerVisible === 1 && adE.featuredImage && (
          <AdWrapper>
            <WideAd
              href={adE.ad_fields.link}
              source={adE.featuredImage.node.sourceUrl}
            />
          </AdWrapper>
        )}
        <Content
          dangerouslySetInnerHTML={{
            __html: post.content.substring(
              post.content.lastIndexOf('<strong>'),
              9999999
            ),
          }}
        />
      </>
    )}
  </div>
);

const Center = styled.div`
  display: flex;
  min-height: 100vh;
  /* align-items: center; */
  justify-content: center;
  margin-top: 200px;
`;

const ShopLink = styled.a`
  display: inline-block;
  color: ${({ theme }) => theme.link};
`;

const authorization =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYWRtaW4ud2VlZHdlZWsucGwiLCJpYXQiOjE2NDIyNTQ0OTQsIm5iZiI6MTY0MjI1NDQ5NCwiZXhwIjoxNjQyODU5Mjk0LCJkYXRhIjp7InVzZXIiOnsiaWQiOjEsImRldmljZSI6IiIsInBhc3MiOiIzZThkNmRmMTlmYTdlMDM0MzA1NzY0NGUxZGE5ZDMwMiJ9fX0.1XrzQDDxmDV0CVZihLWkrnlRCegVNL4oygZKScgKIO8';

const PostPage = ({ data }: Props) => {
  const { adB, adC, adE, post, newests, nasiona, products } = data;
  // const related = post ? post.related_posts?.nodes : [];
  const [bannerVisible, setBanner] = useState(0);
  const [views, setViews] = useState(null);
  const [firstPost, setFirstPost] = useState<Post | null>(null);
  const contentRef = useRef<any>();
  const theme = useContext(ThemeContext);
  // const { observe: observeFirst, inView: inViewFirst } = useInView({
  //   onEnter: async ({ unobserve }) => {
  //     let newPost: any = null;
  //     const {
  //       data: { posts: data },
  //     }: any = await client.query({
  //       query: gql`
  //         query {
  //           posts(
  //             first: 1
  //             where: { offsetPagination: { size: 1, offset: 0 } }
  //           ) {
  //             edges {
  //               node {
  //                 postId
  //                 title
  //                 content
  //                 categories {
  //                   nodes {
  //                     name
  //                     slug
  //                   }
  //                 }
  //                 date
  //                 featuredImage {
  //                   node {
  //                     sourceUrl
  //                   }
  //                 }
  //                 tags {
  //                   nodes {
  //                     name
  //                   }
  //                 }
  //                 slug
  //                 wpisy {
  //                   videoLink
  //                   wpbPostViewsCount
  //                 }
  //                 seo {
  //                   metaDesc
  //                   metaKeywords
  //                   opengraphDescription
  //                   opengraphTitle
  //                   opengraphType
  //                   title
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       `,
  //     });

  //     newPost = data.edges[0].node;

  //     if (newPost.title === post.slug) {
  //       const {
  //         data: { post: data },
  //       }: any = await client.query({
  //         query: gql`
  //           query {
  //             posts(
  //               first: 1
  //               where: { offsetPagination: { size: 1, offset: 0 } }
  //             ) {
  //               edges {
  //                 node {
  //                   postId
  //                   title
  //                   content
  //                   categories {
  //                     nodes {
  //                       name
  //                       slug
  //                     }
  //                   }
  //                   date
  //                   featuredImage {
  //                     node {
  //                       sourceUrl
  //                     }
  //                   }
  //                   tags {
  //                     nodes {
  //                       name
  //                     }
  //                   }
  //                   slug
  //                   wpisy {
  //                     videoLink
  //                     wpbPostViewsCount
  //                   }
  //                   seo {
  //                     metaDesc
  //                     metaKeywords
  //                     opengraphDescription
  //                     opengraphTitle
  //                     opengraphType
  //                     title
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         `,
  //       });
  //       newPost = data.edges[0].node;
  //     }

  //     setFirstPost(newPost);

  //     return unobserve();
  //   }, // only run once
  // });
  const { observe, inView } = useInView({
    onEnter: async ({ unobserve }) => unobserve(),
  });
  // useEffect(() => {
  //   async function makeView() {
  //     await axios.post(
  //       `https://admin.weedweek.pl/wp-json/wp/v2/posts/${post.postId}`,
  //       {
  //         wpb_post_views_count: 'true',
  //       },
  //       {
  //         headers: {
  //           Authorization: authorization,
  //         },
  //       }
  //     );
  //   }

  //   if (post && post.postId) {
  //     makeView();
  //   }
  // }, [post]);

  // useEffect(() => {
  //   async function fetchViews() {
  //     const { data } = await axios.get(
  //       `https://admin.weedweek.pl/wp-json/wp/v2/posts/${post.postId}?_fields[]=wpb_post_views_count`,
  //       {
  //         headers: {
  //           Authorization: authorization,
  //         },
  //       }
  //     );
  //     setViews(data.wpb_post_views_count[0]);
  //   }

  //   fetchViews();
  // }, [post]);

  useInterval(() => {
    setBanner((prevState) => (prevState ? 0 : 1));
  }, 3000);

  if (!post) return null;

  return (
    <Container full>
      <SEO
        title={post.seo.title}
        desc={post.seo.metaDesc}
        keywords={
          post.seo.metaKeywords ||
          post.tags.nodes.map(({ name }) => name).join(', ')
        }
        ogImage={post.featuredImage.node.sourceUrl}
        ogTitle={post.seo.opengraphTitle}
        ogDesc={post.seo.opengraphDescription}
        ogType={post.seo.opengraphType}
        ogUrl={`https://weedweek.pl/${post.slug}`}
      />
      <Section small ref={contentRef}>
        <div>
          <RenderPost
            post={post}
            products={products}
            views={views}
            adC={adC}
            adE={adE}
            bannerVisible={bannerVisible}
          />
          <div ref={observe}>
            {inView && (
              <Disqus id={post.postId} slug={post.slug} title={post.title} />
            )}
          </div>
          <RightWrapperMobile>
            <a
              target="blank"
              href="https://panpestka.pl/bestsellery/?wpam_id=9"
              style={{
                display: 'block',
                margin: '20px 0',
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              <StaticImage
                src="../assets/images/pestkakwadrat.jpeg"
                alt="Pan Pestka"
              />
            </a>
            <StickySection>
              <Sticky>
                <div>
                  <h4>Powiązane</h4>
                  {/* {related && related.length
                    ? related.map((post, index) => {
                        if (index === 0) return null;
                        return (
                          <PostSmall post={{ node: post }} key={index} circle />
                        );
                      })
                    : null} */}
                </div>
              </Sticky>
            </StickySection>
            <ShopSection>
              <Sticky>
                <div>
                  <h4>Nasiona Marihuany</h4>
                  {nasiona
                    ? nasiona.edges.map((post) => (
                        <PostSmall post={post} key={post.slug} circle />
                      ))
                    : null}
                  <ShopWrapper>
                    <div style={{ borderRadius: 10, padding: '0 2px' }}>
                      <StaticImage
                        width={60}
                        height={67}
                        src="../assets/images/panpestka.png"
                        alt=""
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
                      {/* <ShopButton
                        href="mailto:mops@rollmops.pl"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      >
                        Zostań partnerem
                      </ShopButton> */}
                    </ShopDesc>
                  </ShopWrapper>
                </div>
              </Sticky>
            </ShopSection>
            <Sticky>
              <HesiSquare />
            </Sticky>
            {/* <Sticky>
                  {adB.featuredImage && (
                    <SquareAd
                      href={adB.ad_fields.link}
                      source={adB.featuredImage.node.localFile.childImageSharp
                    .gatsbyImageData}
                    />
                  )}
                </Sticky> */}
          </RightWrapperMobile>
          {/* <div>
                {inViewFirst && firstPost && (
                  <>
                    <RenderPost
                      post={firstPost}
                      views={views}
                      adC={adC}
                      adE={adE}
                      bannerVisible={bannerVisible}
                    />
                    <Disqus
                      id={firstPost.postId}
                      slug={firstPost.slug}
                      title={firstPost.title}
                    />
                  </>
                )}
              </div> */}
        </div>
        <RightWrapper>
          <StickySection>
            <Sticky>
              <div>
                <h4>Najnowsze</h4>
                <div>
                  {newests
                    ? newests.edges.map((post, index) => {
                        if (index === 0) return null;
                        return <PostSmall post={post} key={index} circle />;
                      })
                    : null}
                </div>
              </div>
            </Sticky>
          </StickySection>
          <a
            target="blank"
            href="https://panpestka.pl/bestsellery/?wpam_id=9"
            style={{
              display: 'block',
              margin: '20px 0',
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            <StaticImage
              src="../assets/images/pestkakwadrat.jpeg"
              alt="Pan Pestka"
            />
          </a>
          <ShopSection>
            <Sticky>
              <div>
                <h4>Nasiona Marihuany</h4>
                {nasiona
                  ? nasiona.edges.map((post) => (
                      <PostSmall post={post} key={post.slug} circle />
                    ))
                  : null}
                <ShopWrapper>
                  <div style={{ borderRadius: 10 }}>
                    <StaticImage
                      width={60}
                      height={67}
                      src="../assets/images/panpestka.png"
                      alt=""
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
                    {/* <ShopButton
                      href="mailto:mops@rollmops.pl"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      Zostań partnerem
                    </ShopButton> */}
                  </ShopDesc>
                </ShopWrapper>
              </div>
            </Sticky>
          </ShopSection>
          <Sticky>
            <HesiSquare />
          </Sticky>
        </RightWrapper>
      </Section>
      <Section full id="testidhah">
        <div>
          <h4>Najnowsze wpisy</h4>
          <Posts posts={newests.edges || []} />
        </div>
      </Section>
      {adB.featuredImage && (
        <PopupAd
          source={
            adB.featuredImage.node.localFile.childImageSharp.gatsbyImageData
          }
          href={adB.ad_fields.link}
        />
      )}
    </Container>
  );
};

export const pageQuery = graphql`
  query BlogPostById(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    post: wpPost(id: { eq: $id }) {
      id
      title
      content
      categories {
        nodes {
          name
          slug
        }
      }
      date
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
      tags {
        nodes {
          name
        }
      }
      slug
      wpisy {
        videoLink
        wpbPostViewsCount
      }
      seo {
        metaDesc
        metaKeywords
        opengraphDescription
        opengraphTitle
        opengraphType
        title
      }
      # related_posts {
      #   nodes {
      #     title
      #     slug
      #     content
      #     categories {
      #       nodes {
      #         name
      #         slug
      #       }
      #     }
      #     date
      #     featuredImage {
      #       node {
      #         altText
      #         localFile {
      #           childImageSharp {
      #             gatsbyImageData
      #           }
      #         }
      #       }
      #     }
      #   }
      # }
    }
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
    nasiona: allWpPost(
      filter: {
        categories: { nodes: { elemMatch: { databaseId: { eq: 1702 } } } }
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
                  gatsbyImageData
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
    newests: allWpPost(limit: 8, sort: { order: DESC, fields: date }) {
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
      pageInfo {
        hasNextPage
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

export default PostPage;
