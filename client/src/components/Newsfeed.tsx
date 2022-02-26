import React from 'react'
import Ticker from 'react-ticker'
import { NewsfeedPropsInterface } from '../interfaces'

const Newsfeed = (props: NewsfeedPropsInterface) => {
  const Element = () => {
    return (
      <>
        {props.headlines.map((headline) => {
          //   console.log(headline)
          return <p>{headline}</p>
        })}
      </>
    )
  }
  return <Ticker>{() => <Element />}</Ticker>
}

export default Newsfeed
