import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
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
  padding-bottom: 50%;
  border-radius: 10px;
  overflow: hidden;
`;

const Heading = styled.h3`
  color: ${({ theme }) => theme.heading};
  font-size: ${({ theme }) => theme.font.size.xs};
  margin: 0;
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
  <Link href={`/${post.slug}`} passHref>
    <PostLink aria-label={post.title}>
      <PostWrapper>
        <ImageWrapper>
          {post.categories && (
            <StyledCategory slug={post.categories.nodes[0].slug}>
              {post.categories.nodes[0].name}
            </StyledCategory>
          )}
          <Image
            src={post.featuredImage.node.sourceUrl.replace(
              'https://res.cloudinary.com/weedweek/images/f_auto,q_60',
              '',
            )}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            sizes="(max-width: 500px) 440px,(max-width: 991px) 950px, 768px"
            loader={
              post.featuredImage.node.sourceUrl.includes('admin.')
                ? ({ src }) => src
                : undefined
            }
          />
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
      return <Post post={post.node} key={index} />;
    })}
  </Grid>
);

export default Posts;
