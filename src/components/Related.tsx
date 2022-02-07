import Box from 'components/Box';
import PostSmall from 'components/Post';
import { Post } from 'types/types';

interface Props {
  posts: Post[];
}

const Related = ({ posts }: Props) => {
  return (
    <Box title="Powiązane" maxHeight>
      {posts.map((post, index) => (
        <PostSmall post={post} key={index} circle />
      ))}
    </Box>
  );
};

export default Related;
