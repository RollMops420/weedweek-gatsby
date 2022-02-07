import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
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

const ImageWrapper = styled.div`
  padding-bottom: 55%;
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
    <Link href={`/${post.node.slug}`} passHref>
      <a aria-label={post.node.title}>
        <Wrapper>
          <ImageWrapper>
            <Image
              src={post.node.featuredImage.node.sourceUrl.replace(
                'https://res.cloudinary.com/weedweek/images/f_auto,q_60',
                '',
              )}
              alt={post.node.title}
              layout="fill"
              objectFit="cover"
              sizes="(max-width: 500px) 480px,(max-width: 991px) 991px, 768px"
              priority
              loader={
                post.node.featuredImage.node.sourceUrl.includes('admin.')
                  ? ({ src }) => src
                  : undefined
              }
            />
          </ImageWrapper>
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
      </a>
    </Link>
  );
};

export default Featured;
