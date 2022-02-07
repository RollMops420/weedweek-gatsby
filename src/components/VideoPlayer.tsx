import ReactPlayer from 'react-player/lazy';
import styled from 'styled-components';
const Player = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`;
const VideoPlayer = ({ link }: { link: string }) => {
  return <Player width="100%" height="100%" url={link} controls />;
};

export default VideoPlayer;
