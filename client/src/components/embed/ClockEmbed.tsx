import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { ModuleResInterface } from '../../interfaces'
import Header from '../ui/Header'
import { toUpperCase } from '../../utils/utils'

const ClockSection = styled.div`
  color: ${({ theme }) => theme.text};
  font-family: ${({ theme }) => theme.fonts};

  @media only screen and (max-height: 700px) {
    display: flex;
    flex-wrap: nowrap;
    // align-items: flex-end;
    align-items: center;
    justify-content: flex-start;
    // height: 70%;
    height: 82.35%; // 85% of 85
    gap: 1vw;
  }
`

const ClockContainer = styled.div`
  font-family: ${({ theme }) => theme.fonts};
  background: ${({ theme }) => theme.red};
  font-weight: bold;
  width: 100vw;
  height: 44vh;
  @media only screen and (max-height: 700px) {
    height: auto;
    width: 50%;
  }
`

const Value = styled.div`
  margin-left: 1vw;
  transform: scale(1, calc(3.5vh / 3.5vw));
  font-size: max(5vh, min(2rem, 7.5vw));
`

const Unit = styled.div`
  margin-left: 0.5vw;
  font-size: 3.5vw;
  transform: scale(1, calc(3.5vh / 3.5vw));
  font-size: max(5vh, min(2rem, 7.5vw));
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
        <>
          <Value>{years}</Value>
          <Unit>YRS</Unit>
        </>
        <>
          <Value>{days}</Value>
          <Unit>DAYS</Unit>
        </>
        <Value>
          {formattedHour}:{formattedMinutes}:{formattedSeconds}
        </Value>
      </ClockSection>
    </ClockContainer>
  )
}

export default Clock
