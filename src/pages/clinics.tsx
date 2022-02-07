import React from "react";
import { Link, graphql } from "gatsby";
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";
import Container from "components/Container";
import SEO from "components/SEO";
import Section from "components/Section";
// import { Post as IPost } from "types/types";
import Posts from "components/Posts";

const WideBanner = styled.div`
  width: 100%;
  background-color: yellow;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  border-radius: 10px;
  margin-top: 2rem;
`;

const HowToContainer = styled.div`
  display: flex;
  margin: 2rem 0;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }
  & div {
    display: none !important;
  }
  ${({ theme }) => theme.mq.l} {
    padding: 5rem;
    & div {
      display: inline-block !important;
    }
  }
`;

const HowTo = styled.h1`
  text-transform: uppercase;
  text-align: center;
  ${({ theme }) => theme.mq.l} {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(64px);
  }
`;

const ClinicWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  ${({ theme }) => theme.mq.l} {
    grid-template-columns: 1fr 3fr;
  }
  gap: 2rem;
  margin: 3rem 0;
`;

const ClinicImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
`;

const ClinicInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const ClinicName = styled.div`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 125%;
`;

const ClinicText = styled.p``;

const ClinicButton = styled.a`
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.primary};
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 5px;
  font-size: 125%;
`;

const CheckAvailability = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.secondary};
  height: 200px;
  margin-bottom: 10rem;
  background-image: url("https://images.pexels.com/photos/606506/pexels-photo-606506.jpeg?cs=srgb&dl=pexels-michael-fischer-606506.jpg&fm=jpg");
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  text-align: center;
  & h2 {
    font-size: 200%;
    font-weight: bold;
    color: black;
    text-shadow: 0px 0px 10px rgba(255, 255, 255, 1);
  }
  &:hover {
    cursor: pointer;
  }
`;

const posts = {
  edges: [],
};
const clinics = [];

const ClinicsPage = (props) => {
  console.log(props);
  let postIndex = 0;
  return (
    <Container full>
      <SEO
        title="Kliniki Konopne - WeedWeek | Portal Konopny"
        desc="Najbardziej polecane Kliniki Konopne w Polsce"
        // keywords={
        //   post.seo.metaKeywords ||
        //   post.tags.nodes.map(({ name }) => name).join(', ')
        // }
        // ogImage={post.featuredImage.node.sourceUrl}
        ogTitle="Kliniki Konopne - WeedWeek"
        ogDesc="Najbardziej polecane Kliniki Konopne w polsce"
        // ogType={post.seo.opengraphType}
        ogUrl={`https://weedweek.pl/clinics`}
      />
      <Container>
        {/* <WideBanner>Banner</WideBanner> */}
        <Link to="/jak-uzyskac-recepte-na-medyczna-marihuane-praktyczne-porady">
          <HowToContainer>
            <HowTo>Jak uzyskać receptę?</HowTo>
            <StaticImage
              src="../assets/images/natural.png"
              alt="Natural"
              width={128}
              height={128}
            />
          </HowToContainer>
        </Link>
      </Container>
      <Section full title="Kliniki konopne">
        {clinics.edges.map((node, i) => {
          const clinic = node.node;
          return (
            <React.Fragment key={i}>
              {i > 0 && i % 2 == 0 && (
                <Posts
                  isList={true}
                  posts={[
                    posts.edges[postIndex++],
                    posts.edges[postIndex++],
                    posts.edges[postIndex++],
                    posts.edges[postIndex],
                  ]}
                />
              )}
              <ClinicWrapper>
                <ClinicImageWrapper>
                  {clinic.featuredImage && (
                    <GatsbyImage
                      image={getImage(clinic.image)}
                      alt={clinic.title}
                      objectFit="cover"
                    />
                  )}
                </ClinicImageWrapper>
                <ClinicInfo>
                  <ClinicName>{clinic.title}</ClinicName>
                  <div>
                    <ClinicText
                      dangerouslySetInnerHTML={{
                        __html: clinic.details.adres.replace(",", ",<br/>"),
                      }}
                    />
                    <ClinicButton href={clinic.details.link}>
                      Umów wizytę
                    </ClinicButton>
                  </div>
                </ClinicInfo>
              </ClinicWrapper>
            </React.Fragment>
          );
        })}
      </Section>
      <Container>
        <a
          href="https://www.gdziepolek.pl/wyszukiwanie?q=Cannabis"
          target="_blank"
          rel="noopener noreferrer"
        >
          <CheckAvailability>
            <h2>Sprawdź dostępność medycznej marihuany!</h2>
          </CheckAvailability>
        </a>
      </Container>
    </Container>
  );
};

export const pageQuery = graphql`
  query {
    clinics {
      edges {
        node {
          featuredImage {
            childImageSharp {
              gatsbyImageData(
                width: 200
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
          title
          slug
          details {
            adres
            link
          }
        }
      }
    }
  }
`;

export default ClinicsPage;
