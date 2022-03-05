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
  justify-content: center;
  align-items: center;
  line-height: 0;
  font-weight: bold;
  h3 {
    display: flex;
    flex-wrap: nowrap;
    font-size: 8.125rem;
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
      font-size: 8.125rem;
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
  @media screen and (max-width: 800px) {
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
`
function Clock(props: ModuleResInterface) {
  let date = new Date()
  let calendar =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  let today =
    date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  let current = calendar + ' ' + today

  let years
  let days
  let hours
  let minutes
  let seconds
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

  var formattedHour
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

  var formattedMinutes
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

  var formattedSeconds
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

  // eslint-disable-next-line
  const [year, setYear] = useState(0)
  // eslint-disable-next-line
  const [day, setDay] = useState(0)
  // eslint-disable-next-line
  const [hour, setHour] = useState(0)
  // eslint-disable-next-line
  const [minute, setMinute] = useState(0)
  // eslint-disable-next-line
  const [sec, setSec] = useState(0)
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
        <h3>{years}</h3> <h2>YRS</h2> <h3>{days}</h3> <h2>DAYS</h2>
        <h3>
          {formattedHour}:{formattedMinutes}:{formattedSeconds}
        </h3>
      </ClockSection>
    </div>
  )
}

export default Clock
