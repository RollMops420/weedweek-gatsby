import styled from 'styled-components';
import Image from 'next/image';

const Wrapper = styled.div`
  border-radius: 30px;
  width: 100%;
  padding-bottom: 100%;
  margin-bottom: 10px;
  overflow: hidden;
  position: relative;
  /* background-color: yellow; */
  &:hover {
    cursor: pointer;
  }
`;

const Letter = styled.span`
  font-size: 48px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Poppins';
  font-weight: bold;
`;

const PostSquareAd = () => {
  return (
    <Wrapper>
      {/* <Image
        src="/images/squaread.png"
        layout="fill"
      /> */}
      <Letter>B</Letter>
    </Wrapper>
  );
};

export default PostSquareAd;
