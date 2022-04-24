import moment from 'moment'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ModuleResInterface } from '../../interfaces'
import { toUpperCase } from '../../utils/utils'
import Header from '../ui/Header'

const ClockSection = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 20vh;
  font-family: ${({ theme }) => theme.fonts};
  text-align: center;
  position: relative;
  justify-content: center;
  align-items: center;
  line-height: 0;
  font-weight: bold;
  h3 {
    display: flex;
    flex-wrap: nowrap;
    font-size: 5.125rem;
    display: inline-block;
    margin-top: calc(-1rem + 4vh);
  }
  h2 {
    display: flex;
    flex-wrap: nowrap;
    display: inline-block;
    font-size: 4.063rem;
    padding: 0 5px 0 5px;
    margin-top: 9%;
  }
  @media screen and (max-width: 1000px) {
    display: flex;
    flex-wrap: wrap;
    white-space: nowrap;
    overflow: hidden;
    h3 {
      display: flex;
      flex-wrap: nowrap;
      font-size: 5.125rem;
      display: inline-block;
      margin-top: 9%;
    }
    h2 {
      display: flex;
      flex-wrap: nowrap;
      display: inline-block;
      font-size: 4.063rem;
      padding: 0 5px 0 5px;
      margin-top: 5%;
    }
  }
  @media only screen and (max-width: 800px) {
    display: flex;
    flex-wrap: wrap;
    white-space: nowrap;
    overflow: hidden;
    h3 {
      font-size: 0.4em;
      margin-top: 11%;
    }
    h2 {
      font-size: 0.2em;
      padding: 0 5px 0 5px;
      margin-top: 8%;
    }
  }

  @media only screen and (max-height: 600px) {
    height: 50vh;
    display: flex;
    flex-wrap: wrap;
    white-space: nowrap;
    overflow: hidden;
    h3 {
      font-size: 1em;
      margin-top: 11%;
    }
    h2 {
      font-size: 0.5em;
      padding: 0 5px 0 5px;
      margin-top: 8%;
    }
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
  let years = 0
  let days = 0
  let hours = 0
  let minutes = 0
  let seconds = 0

  let value = 0
  if (props.timestamp) {
    value = moment(props.timestamp).valueOf() - moment().valueOf()
  }

  const ms_per_year = 3.154e10 // number of milliseconds per year
  const ms_per_day = 8.64e7
  const ms_per_hour = 3.6e6
  const ms_per_minute = 60000
  const ms_per_second = 1000

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
        <h3>{years}</h3> <h2>YRS</h2> <h3>{days}</h3> <h2>DAYS</h2>
        <h3>
          {formattedHour}:{formattedMinutes}:{formattedSeconds}
        </h3>
      </ClockSection>
    </ClockContainer>
  )
}

export default Clock
