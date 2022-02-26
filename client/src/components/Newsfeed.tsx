import Ticker from 'react-ticker'
import Headlines from './Headlines'
import { NewsfeedPropsInterface } from '../interfaces'

const Newsfeed = (props: NewsfeedPropsInterface) => {
  // <h1 style={{ width: '100vw' }}>{props.headlines[index]}</h1>

  return <Ticker>{() => <Headlines headlines={props.headlines} />}</Ticker>
}

export default Newsfeed
