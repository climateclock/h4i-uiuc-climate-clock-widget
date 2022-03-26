import Marquee from 'react-fast-marquee'
import { HeadlinesInterface } from '../interfaces'
import { MarqueeContainer } from './styles'

const Newsfeed = (props: HeadlinesInterface) => {
  return (
    <MarqueeContainer>
      <Marquee gradient={false} speed={200}>
        {props.headline}
      </Marquee>
    </MarqueeContainer>
  )
}

export default Newsfeed
