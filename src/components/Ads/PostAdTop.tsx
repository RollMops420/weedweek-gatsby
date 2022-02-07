import styled from 'styled-components';
import Image from 'next/image';

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  padding-bottom: 30%;
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

const PostAdTop = () => {
  return (
    <Wrapper>
      {/* <Image
        src="/images/widead.png"
        layout="fill"
      /> */}
      <Letter>E</Letter>
    </Wrapper>
  );
};

export default PostAdTop;
