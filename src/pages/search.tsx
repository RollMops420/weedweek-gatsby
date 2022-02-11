import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import Post from 'components/PostCategory';
import Section from 'components/Section';
import algoliasearch from 'algoliasearch';
import {
  InstantSearch,
  connectSearchBox,
  connectHits,
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  '9E0GVIOJ0V',
  'd48a5b5d32c98c3a6b48d7b2c1625af9'
);

const StyledArticle = styled.article`
  margin: 2rem 0;
`;

function Hits({ hits }) {
  return hits.map((hit) => (
    <StyledArticle key={hit.ID}>
      <Post
        post={{
          node: {
            id: hit.ID,
            title: hit.post_title,
            slug: hit.post_name,
            date: hit.post_date,
            excerpt: hit.post_excerpt,
            featuredImage: { node: { sourceUrl: hit.post_image } },
            author: {
              node: {
                firstName: 'Mikołaj',
                lastName: '',
              },
            },
            categories: { nodes: [{ name: 'kateogire', slug: 'asfdsf' }] },
          },
        }}
      />
    </StyledArticle>
  ));
}

const CustomHits = connectHits(Hits);
const VirtualSB = connectSearchBox(() => <span />);

const Search = ({ location }) => {
  const [search, setSearch] = useState<any>({ query: ' ' });

  useEffect(() => {
    setSearch({ query: location.search.substring(7, 999) });
  }, [location]);

  return (
    <>
      <Container>
        <Section full>
          <InstantSearch
            searchClient={searchClient}
            indexName="weedweek"
            searchState={search}
          >
            <VirtualSB />
            <CustomHits />
          </InstantSearch>
        </Section>
      </Container>
    </>
  );
};

export default Search;
