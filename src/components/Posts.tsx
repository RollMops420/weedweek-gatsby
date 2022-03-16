import React from 'react';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import Category from 'components/Category';
import { Post as IPost } from 'types/types';

dayjs.locale('pl');

interface GridProps {
  list?: boolean;
}

const Grid = styled.div<GridProps>`
  display: ${({ list }) => (list ? 'grid' : 'flex')};
  grid-gap: 20px;
  overflow-x: auto;
  ${({ theme }) => theme.mq.m} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 20px;
    overflow-x: none;
  }
  ${({ theme }) => theme.mq.l} {
    grid-template-columns: repeat(4, 1fr);
    overflow-x: none;
  }
`;

const PostLink = styled.a`
  min-width: 250px;
  ${({ theme }) => theme.mq.m} {
    min-width: unset;
  }
`;

const PostWrapper = styled.article`
  margin-bottom: 10px;
  margin-right: 10px;
  ${({ theme }) => theme.mq.l} {
    margin-bottom: 0;
    margin-right: 0;
  }
  &:hover {
    & h3 {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 10px;
  & img {
    border-radius: 10px;
  }
  height: 150px;
  overflow: hidden;
`;

const Image = styled(GatsbyImage)`
  height: 100%;
  object-fit: cover;
`;

const Heading = styled.h3`
  color: ${({ theme }) => theme.heading};
  font-size: ${({ theme }) => theme.font.size.xs};
  margin: 0;
  margin-top: 10px;
`;

const StyledCategory = styled(Category)`
  position: absolute;
  top: 10%;
  left: 5%;
  z-index: 1;
`;

interface Props {
  posts: IPost[];
  isList?: boolean;
}

const Post = ({ post }: any) => (
  <Link to={`/${post.slug}`}>
    <PostLink aria-label={post.title}>
      <PostWrapper>
        <ImageWrapper>
          {post.categories && (
            <StyledCategory slug={post.categories.nodes[0].slug}>
              {post.categories.nodes[0].name}
            </StyledCategory>
          )}
          {post.featuredImage.node.localFile && (
            <Image
              image={getImage(
                post.featuredImage.node.localFile.childImageSharp
                  .gatsbyImageData
              )}
              alt={post.title}
              objectFit="cover"
            />
          )}
        </ImageWrapper>
        <div>
          <Heading>{post.title}</Heading>
        </div>
      </PostWrapper>
    </PostLink>
  </Link>
);

const Posts = ({ posts, isList }: Props) => (
  <Grid list={isList}>
    {posts.map((post, index) => {
      return <Post post={post.node ? post.node : post} key={index} />;
    })}
  </Grid>
);

export default Posts;
