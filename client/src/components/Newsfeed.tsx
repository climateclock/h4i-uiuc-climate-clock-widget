// import Ticker from 'react-ticker'
import Marquee from 'react-fast-marquee'
import { HeadlinesInterface } from '../interfaces'
import { MarqueeContainer } from './styles'

const Newsfeed = (props: HeadlinesInterface) => {
  // let concatenatedHeadlines = ''
  // props.news.forEach(
  //   (article) => (concatenatedHeadlines += article.headline?.toUpperCase),
  // )
  // for (let i = 0; i < props.headlines.length; i++) {
  //   concatenatedHeadlines = concatenatedHeadlines.toUpperCase()
  //   console.log(i)
  // }
  // return <Ticker>{() => <Headlines headlines={props.headlines} />}</Ticker>
  // return <Ticker>{({ index }) => <p>{props.headlines[index]}</p>}</Ticker>
  return (
    <MarqueeContainer>
      <Marquee gradient={false} speed={200}>
        {props.headline}
      </Marquee>
    </MarqueeContainer>
  )
}

export default Newsfeed
