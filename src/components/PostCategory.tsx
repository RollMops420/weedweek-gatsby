import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
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
  border-bottom: 2px solid ${({ theme }) => theme.primary};
  display: grid;
  grid-template-columns: 40% 60%;
  grid-gap: 10px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const ImageNormal = styled.img`
  margin-right: 10px;
  width: 100%;
  border-radius: 8px;
  ${({ circle }: { circle: boolean }) =>
    circle &&
    `
    border-radius: 50%;
    width: 64px;
    height: 64px;
  `}
`;

const Image = styled(GatsbyImage)`
  margin-right: 10px;
  width: 100%;
  border-radius: 8px;
  ${({ circle }: { circle: boolean }) =>
    circle &&
    `
    border-radius: 50%;
    width: 64px;
    height: 64px;
  `}
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Heading = styled.h3`
  font-size: ${({ theme }) => theme.font.size.xs};
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

const Excerpt = styled.p`
  color: ${({ theme }) => theme.text};
  margin: 0;
  padding: 0;
  display: none;
  font-size: 80%;
  ${({ theme }) => theme.mq.l} {
    display: block;
  }
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
      <Wrapper>
        {post.node.featuredImage.node.sourceUrl ? (
          <ImageNormal
            src={post.node.featuredImage.node.sourceUrl}
            circle={circle}
          />
        ) : (
          post.node.featuredImage.node.localFile && (
            <Image
              image={getImage(
                post.node.featuredImage.node.localFile.childImageSharp
                  .gatsbyImageData
              )}
              alt={post.node.featuredImage.node.altText}
              circle={circle}
            />
          )
        )}
        <Content>
          <div>
            <Heading dangerouslySetInnerHTML={{ __html: post.node.title }} />
            <Excerpt dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />
          </div>
          <Date>
            {/* {post.node.author.node.firstName} {post.node.author.node.lastName}{' '} */}
            {/* &bull;  */}
            {dayjs(post.node.date).format('DD MMMM YYYY')}
          </Date>
        </Content>
      </Wrapper>
    </Link>
  );
};

export default Post;
