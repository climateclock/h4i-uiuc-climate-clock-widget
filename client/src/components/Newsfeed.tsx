import Marquee from 'react-fast-marquee'
import { MarqueeContainer } from './styles'

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
