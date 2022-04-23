import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { ModuleResInterface } from '../../interfaces'

import Header from '../ui/Header'
import { toUpperCase } from '../../utils/utils'
const ClockSection = styled.div`
color: ${({ theme }) => theme.text};
  font-size: 20vh;
  font-family: ${({ theme }) => theme.fonts};
  text-align: center;
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  padding-top: calc(2% + 5vh);

  div {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: flex-end;
    margin: 20px;
  }

  h2,
  h5 {
    font-size: max(5.5rem, min(6.5rem,8vw));
    margin: 0%;
  }

  h3 {
    font-size: max(2.75rem,min(3.25rem, 4vw));
    margin: 0%;
    margin-left: 15px;
    align-self: flex-end;
    margin-bottom: 17px;
  }

  // This style deals with padding for when there is only one lifeline
  @media screen and (max-height: 700px) {
    padding-top: calc(10vh  + 2%);
  }

  // For iPads
  @media screen and (max-width: 1000px) and (min-height: 500px) {
    margin: 0px;

    h2 {
      font-size: 11vmin;
    }
    h3 {
      font-size: 4vmin;
      margin-bottom: 18px;
    }
    h5 {
      font-size: 10vmin;
      margin: 10px;
    }
  }

  @media screen and (max-width: 800px) and (min-height: 800px) and (orientation: portrait) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    div {
      margin: 10px;
    }

    h2 {
      font-size: max(5rem, min(6rem, 7vw));
    }

    h3 {
      font-size: max(2.5rem, min(3rem, 3.5vw));
      margin-bottom: 9px;
    }

    h5 {
      font-size: max(3rem, min(2.75rem, 3.25vw));
    }
  }

  @media screen and (max-width: 800px) and (max-height: 800px) and (orientation: portrait) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    padding-top: 3%;

    div {
      margin: 5px;
    }

    h2 {
      font-size: max(4rem, min(5rem, 6vw));
    }

    h3 {
      font-size: max(2rem, min(2.5rem, 3vw));
      margin-bottom: 9px;
    }

    h5 {
      font-size: max(2.5rem, min(2.25rem, 2.75vw));
    }
  }

  @media screen and (orientation: portrait) and (max-height: 700px) and (min-height: 400px) {
    padding-top: 7vh;
  }

  // Landscape style, doesn't utilize the wrap
  @media screen and (max-width: 900px) and (max-height: 800px) {

    h2, h5 {
      font-size: max(4rem, min(5rem, 6vw));
    }

    h3 {
      font-size: max(2rem, min(2.5rem, 3vw));
      margin-bottom: 9px;
    }
  }

  @media screen and (max-width: 700px) and (max-height: 800px) {

    h2, h5 {
      font-size: max(3rem, min(4rem, 5vw));
    }

    h3 {
      font-size: max(1.5rem, min(2rem, 2.5vw));
      margin-bottom: 9px;
    }
  }

  @media screen and (max-height: 300px) {
    padding-top: 0px;
  }
`

const ClockContainer = styled.div`
  font-family: ${({ theme }) => theme.fonts};
  font-weight: bold;
  background: ${({ theme }) => theme.red};
  height: 44vh;
  @media only screen and (max-height: 700px) {
    height: 65vh;
  }

  width: 100vw;
`

function Clock(props: ModuleResInterface) {
  let date = new Date()
  let calendar =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  let today =
    date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()

  let current = calendar + ' ' + today

  let years: any, days: any, hours: any, minutes: any, seconds: any

  if (props.timestamp === undefined) {
    years = 0
    days = 0
    hours = 0
    minutes = 0
    seconds = 0
  }

  let value = new Date(props.timestamp!).valueOf() - new Date(current).valueOf()
  let ms_per_year = 3.154e10 // number of milliseconds per year
  let ms_per_day = 8.64e7
  let ms_per_hour = 3.6e6
  let ms_per_minute = 60000
  let ms_per_second = 1000

  if (years !== 0) {
    years = Math.floor(value / ms_per_year)
  }
  if (days !== 0) {
    days = Math.floor((value - years * ms_per_year) / ms_per_day)
  }
  if (hours !== 0) {
    hours = Math.floor(
      (value - years * ms_per_year - days * ms_per_day) / ms_per_hour,
    )
  }

  let formattedHour
  if (hours + 1 < 10) {
    formattedHour = '0' + hours
  } else {
    formattedHour = Math.floor(
      (value - years * ms_per_year - days * ms_per_day) / ms_per_hour,
    )
  }

  if (minutes !== 0) {
    minutes = Math.floor(
      (value - years * ms_per_year - days * ms_per_day - hours * ms_per_hour) /
        ms_per_minute,
    )
  }

  let formattedMinutes
  if (minutes + 1 <= 10) {
    formattedMinutes = '0' + minutes
  } else {
    formattedMinutes = Math.floor(
      (value - years * ms_per_year - days * ms_per_day - hours * ms_per_hour) /
        ms_per_minute,
    )
  }

  if (seconds !== 0) {
    seconds = Math.floor(
      (value -
        years * ms_per_year -
        days * ms_per_day -
        hours * ms_per_hour -
        minutes * ms_per_minute) /
        ms_per_second,
    )
  }

  let formattedSeconds
  if (seconds + 1 <= 10) {
    formattedSeconds = '0' + seconds
  } else {
    formattedSeconds = Math.floor(
      (value -
        years * ms_per_year -
        days * ms_per_day -
        hours * ms_per_hour -
        minutes * ms_per_minute) /
        ms_per_second,
    )
  }

  const [, setYear] = useState(0)
  const [, setDay] = useState(0)
  const [, setHour] = useState(0)
  const [, setMinute] = useState(0)
  const [, setSec] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setYear((years) => ++years)
      setDay((days) => ++days)
      setHour((formattedHour) => ++formattedHour)
      setMinute((formattedMinutes) => ++formattedMinutes)
      setSec((formattedSeconds) => ++formattedSeconds)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ClockContainer>
      <Header
        moduleType={props.flavor ? toUpperCase(props.flavor) : ' '}
        title={props.labels ? (props.labels[0] ? props.labels[0] : '') : ''}
        themeColor={({ theme }) => theme.red}
      />
      <ClockSection>
        <div>
          <h2>{years}</h2> <h3>YRS</h3>
        </div>
        <div>
          <h2>{days}</h2> <h3>DAYS</h3>
        </div>
        <h5>
          {formattedHour}:{formattedMinutes}:{formattedSeconds}
        </h5>
      </ClockSection>
    </ClockContainer>
  )
}

export default Clock
