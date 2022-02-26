import Ticker from 'react-ticker'
import Headlines from './Headlines'
import { NewsfeedPropsInterface } from '../interfaces'

const Newsfeed = (props: NewsfeedPropsInterface) => {
  return <Ticker>{() => <Headlines headlines={props.headlines} />}</Ticker>
  // return <Ticker>{({ index }) => <p>{props.headlines[index]}</p>}</Ticker>
}

export default Newsfeed
