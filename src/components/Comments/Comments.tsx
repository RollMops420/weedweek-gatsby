import styled from 'styled-components'
import Image from 'next/image'
import Box from 'components/Box'

const InputWrapper = styled.div`
  position: relative;
`

const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  border-radius: 30px;
  outline: none;
  border: none;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, .1);
  &:focus {
    border: 1px solid ${({ theme }) => theme.light.primary};
    padding: 9px 19px;
  }
`

const Send = styled.div`
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  &:hover {
    cursor: pointer;
  }
`

const Comments = () => {
  return (
    <Box title="Komentarze">
      <InputWrapper>
        <Input placeholder="Bardzo dobry artykuł!" />
        <Send>
          <Image src="/icons/send.svg" width={24} height={24} />
        </Send>
      </InputWrapper>
    </Box>
  )
}

export default Comments