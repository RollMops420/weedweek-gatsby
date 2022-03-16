import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import styled from 'styled-components';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import { Post as IPost } from 'types/types';

dayjs.locale('pl');

interface Props {
  post: IPost;
  circle?: boolean;
}

const StyledLink = styled.a`
  ${({ theme }) => theme.mq.l} {
    &:last-of-type article {
      border-bottom: none;
      padding-bottom: 0;
      margin-bottom: 0;
    }
  }
`;

const Wrapper = styled.article`
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  &:hover {
    & h3 {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const Image = styled(GatsbyImage)`
  margin-right: 10px;
  width: 35%;
  height: 100px;
  border-radius: 8px;
  & img {
    border-radius: 8px;
  }
  align-self: flex-start;
  ${({ circle }: { circle: boolean }) =>
    circle &&
    `
    border-radius: 10px;
    width: 90px;
    height: 70px;
  `}
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(65% - 10px);
  height: 100px;
  ${({ circle }: { circle: boolean }) =>
    circle &&
    `
    height: 80px;
  `}
`;

const Heading = styled.h3`
  font-size: ${({ theme }) => theme.font.size.xs};
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

const Date = styled.p`
  color: ${({ theme }) => theme.darkgrey};
  font-weight: bold;
  font-size: ${({ theme }) => theme.font.size.xs};
  font-family: ${({ theme }) => theme.font.family.calibre};
  margin: 0;
`;

const Post = ({ post, circle = false }: Props) => {
  return (
    <Link to={`/${post.node.slug}`}>
      <StyledLink>
        <Wrapper>
          {post.node.featuredImage.node.localFile && (
            <Image
              image={
                post.node.featuredImage.node.localFile.childImageSharp
                  .gatsbyImageData
              }
              alt={post.node.title}
              circle={circle}
            />
          )}
          <Content circle={circle}>
            <Heading>
              {post.node.title.substring(0, 65)}
              {post.node.title.length > 65 && '...'}
            </Heading>
          </Content>
        </Wrapper>
      </StyledLink>
    </Link>
  );
};

export default Post;
