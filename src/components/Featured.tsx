import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import dayjs from 'dayjs';
import Category from 'components/Category';
import 'dayjs/locale/pl';
import { Post } from 'types/types';

dayjs.locale('pl');

const Wrapper = styled.article`
  position: relative;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: 0.2s ease;
  margin-bottom: 10px;
  &:hover {
    transform: scale(1.01);
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  }
`;

const Image = styled(GatsbyImage)`
  /* padding-bottom: 30%; */
  object-fit: cover;
  width: 100%;
`;

const Content = styled.div`
  position: absolute;
  padding: 10px;
  width: 100%;
  color: white;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 0, 0, 0.7) 100%
  );
  backdrop-filter: blur(1px);
  bottom: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  ${({ theme }) => theme.mq.l} {
    padding: 50px;
  }
  & h2 {
    margin: 20px 0 10px 0;
    font-size: ${({ theme }) => theme.font.size.s};
    ${({ theme }) => theme.mq.l} {
      font-size: ${({ theme }) => theme.font.size.m};
    }
  }
`;

const Info = styled.div`
  color: hsl(0, 0%, 80%);
`;

interface Props {
  post: Post;
}

const Featured = ({ post }: Props) => {
  return (
    <Link to={`/${post.node.slug}`}>
      <Wrapper>
        <Image
          image={
            post.node.featuredImage.node.localFile.childImageSharp
              .gatsbyImageData
          }
          alt={post.node.title}
        />
        <Content>
          <Category slug={post.node.categories.nodes[0].slug}>
            {post.node.categories.nodes[0].name}
          </Category>
          <h2>{post.node.title}</h2>
          <Info>
            {post.node.author.node.firstName} {post.node.author.node.lastName}{' '}
            &bull; {dayjs(post.node.date).format('DD MMMM YYYY')}
          </Info>
        </Content>
      </Wrapper>
    </Link>
  );
};

export default Featured;
