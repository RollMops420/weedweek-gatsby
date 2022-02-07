import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { Post as IPost } from 'types/types';

interface Props {
  posts: IPost[];
}

const PostWrapper = styled.div`
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.darkgrey};
  margin-bottom: 20px;
  ${({ theme }) => theme.mq.m} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    padding-right: 20px;
  }
  &:hover {
    & h4 {
      color: ${({ theme }) => theme.primary};
    }
    & strong {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const ImageWrapper = styled.div`
  align-self: flex-start;
  position: relative;
  padding-bottom: 60%;
  border-radius: 10px;
  overflow: hidden;
`;

const Heading = styled.h4`
  color: ${({ theme }) => theme.color};
  padding: 0 10px;
  ${({ theme }) => theme.mq.m} {
    padding: 0;
  }
`;

const Desc = styled.span`
  color: ${({ theme }) => theme.color};
  font-size: 14px;
  & p {
    padding: 0 10px;
    font-size: 13px;
  }
  ${({ theme }) => theme.mq.m} {
    & p {
      padding: 0;
      font-size: 14px;
    }
  }
`;

const PostsDesc = ({ posts }: Props) => {
  return (
    <>
      {posts.map((post) => (
        <Link key={post.node.slug} href={`/${post.node.slug}`} passHref>
          <a>
            <PostWrapper>
              <ImageWrapper>
                <Image
                  src={post.node.featuredImage.node.sourceUrl.replace(
                    'https://res.cloudinary.com/weedweek/images/f_auto,q_60',
                    '',
                  )}
                  objectFit="cover"
                  layout="fill"
                  loader={
                    post.node.featuredImage.node.sourceUrl.includes('admin.')
                      ? ({ src }) => src
                      : undefined
                  }
                />
              </ImageWrapper>
              <div>
                <Heading>{post.node.title}</Heading>
                <Desc
                  dangerouslySetInnerHTML={{
                    __html: post.node.excerpt.replace(
                      '[&hellip;]',
                      '<strong>WIĘCEJ</strong>',
                    ),
                  }}
                />
              </div>
            </PostWrapper>
          </a>
        </Link>
      ))}
    </>
  );
};

export default PostsDesc;
