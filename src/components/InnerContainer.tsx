import { ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  children: ReactNode
}

const Wrapper = styled.div`
  content-visbility: auto;
  contain-intrinsic-size: 0 500px;
  max-width: 100%;
  ${({ theme }) => theme.mq.l} {
    padding: 0 0 20px 0 ;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 20px;
  }
`

const InnerContainer = ({children}: Props) => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

export default InnerContainer