import Marquee from 'react-fast-marquee'
import styled from 'styled-components'

const MarqueeContainer = styled.div`
  background: ${({ theme }) => theme.black};
  color: ${({ theme }) => theme.blue};
  padding: 0 2%;
  font-size: max(2rem, min(4rem, 6vw));
  font-weight: bold;
`

const Newsfeed = ({ headline }: { headline: string }) => {
  return (
    <MarqueeContainer>
      <Marquee gradient={false} speed={200}>
        {headline}
      </Marquee>
    </MarqueeContainer>
  )
}

export default Newsfeed
