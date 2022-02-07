import styled from 'styled-components';
import Image from 'next/image';

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  padding-bottom: 27%;
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

const WideAd = ({ source, href }: { source: string; href: string }) => {
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
          sizes="(max-width: 500px) 480px,(max-width: 991px) 991px, 768px"
          priority
          loader={source.includes('admin.') ? ({ src }) => src : undefined}
        />
        {/* <Letter>
          A
        </Letter> */}
      </Wrapper>
    </a>
  );
};

export default WideAd;
