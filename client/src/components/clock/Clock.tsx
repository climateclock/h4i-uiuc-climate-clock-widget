import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { ModuleResInterface } from '../../interfaces'

const ClockSection = styled.div`
  color: ${({ theme }) => theme.text};
  height: 50vh;
  font-size: 20vh;
  font-family: ${({ theme }) => theme.fonts};
  text-align: center;
  background: ${({ theme }) => theme.red};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  padding: 5%;

  div {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: flex-end;
    margin: 20px;
  }

  h3 {
    font-size: 15vmin;
    display: inline-block;
    margin: 0%;
  }

  h2 {
    display: inline-block;
    font-size: 5vmin;
    margin: 0%;
    margin-left: 15px;
    align-self: flex-end;
    margin-bottom: 17px;
  }

  @media screen and (max-width: 1400px) {
    h3 {
      font-size: 11vmin;
    }

    h2 {
      font-size: 4vmin;
    }
  }

  // For iPads
  @media screen and (max-width: 1050px) and (min-height: 500px) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    h3 {
      font-size: 12vmin;
    }

    h2 {
      font-size: 4vmin;
    }
  }
  
  @media screen and (max-width: 800px) and (min-height: 500px) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    h3 {
      font-size: 14vmin;
    }

    h2 {
      font-size: 6vmin;
    }
  }

  @media screen and (max-width: 500px) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    div {
      margin: 0px;
      margin-bottom: 20px;
    }

    h3 {
      font-size: 15vmin;
      margin: 0;
    }

    h2 {
      font-size: 7vmin;
      margin: 0;
      margin-bottom: 5px;
    }
  }
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
    <div className="container">
      <ClockSection>
        <div><h3>{years}</h3> <h2>YRS</h2></div>
        <div><h3>{days}</h3> <h2>DAYS</h2></div>
        <h3>
          {formattedHour}:{formattedMinutes}:{formattedSeconds}
        </h3>
      </ClockSection>
    </div>
  )
}

export default Clock
