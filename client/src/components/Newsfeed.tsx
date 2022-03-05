// import Ticker from 'react-ticker'
import Headlines from './Headlines'
import Marquee from 'react-fast-marquee'
import { NewsfeedPropsInterface } from '../interfaces'

const Newsfeed = (props: NewsfeedPropsInterface) => {
  console.log(props.headlines[0])
  let concatenatedHeadlines = ''
  for (let i = 0; i < props.headlines.length; i++) {
    concatenatedHeadlines += props.headlines[i]
    console.log(i)
  }
  // return <Ticker>{() => <Headlines headlines={props.headlines} />}</Ticker>
  // return <Ticker>{({ index }) => <p>{props.headlines[index]}</p>}</Ticker>
  return <Marquee gradient={false}>{concatenatedHeadlines}</Marquee>
}

export default Newsfeed
