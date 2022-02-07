import styled from 'styled-components';
import Image from 'next/image';

const Wrapper = styled.div`
  border-radius: 10px;
  width: 100%;
  padding-bottom: 100%;
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

const SquareAd = ({ source, href }: { source: string; href: string }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer nofollow">
      <Wrapper>
        <Image
          src={source.replace(
            'https://res.cloudinary.com/weedweek/images/f_auto,q_60',
            '',
          )}
          alt="Reklama"
          layout="fill"
          objectFit="cover"
          sizes="(max-width: 500px) 480px,(max-width: 991px) 991px, 333px"
          loader={source.includes('admin.') ? ({ src }) => src : undefined}
        />
        {/* <Letter>B</Letter> */}
      </Wrapper>
    </a>
  );
};

export default SquareAd;
