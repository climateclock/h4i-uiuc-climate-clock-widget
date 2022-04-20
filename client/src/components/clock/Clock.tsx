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
  padding: 3%;

    /* @media screen and (orientation: landscape) {
    div {
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: flex-end;
      margin: 20px;
    }

    h2,
    h5 {
      font-size: 15vmin;
      margin: 0%;
    }

    h3 {
      font-size: 7.5vmin;
      margin: 0%;
      margin-left: 15px;
      align-self: flex-end;
      margin-bottom: 17px;
    }
  } */

  @media screen and (orientation: landscape) {
    padding: 4%;

    div {
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: flex-end;
      margin: 20px;
    }

    h2,
    h5 {
      font-size: 14vmin;
      margin: 0%;
    }

    h3 {
      font-size: 7vmin;
      margin: 0%;
      margin-left: 15px;
      align-self: flex-end;
      margin-bottom: 17px;
    }
  }

  @media screen and (orientation: landscape) and (max-width: 1200px) {
    padding: 6%;

    h2,
    h5 {
      font-size: 10vmin;
    }

    h3 {
      font-size: 5vmin;
      margin-bottom: 5px;
    }
  }

  @media screen and (orientation: landscape) and (max-width: 850px) {
    padding: 5%;

    h2,
    h5 {
      font-size: 9.5vmin;
    }

    h3 {
      font-size: 4.75vmin;
    }
  }

  @media screen and (orientation: landscape) and (max-height: 700px) {
    
    h2,
    h5 {
      font-size: 14vmin;
    }

    h3 {
      font-size: 7vmin;
    }
  }

  @media screen and (orientation: landscape) and (max-height: 600px) {
    
    h2,
    h5 {
      font-size: 12vmin;
    }

    h3 {
      font-size: 6vmin;
    }
  }

  @media screen and (orientation: landscape) and (max-height: 300px) {
    padding: 2%;

    h2,
    h5 {
      font-size: 14vmin;
    }

    h3 {
      font-size: 7vmin;
    }
  }

  @media screen and (orientation: portrait) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 2%;
    margin: 0px;

    div {
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: flex-end;
      margin-bottom: 10%;
    }

    h2 {
      font-size: 20vmin;
      margin: 0px;
    }

    h3 {
      font-size: 10vmin;
      margin-bottom: 9px;
    }

    h5 {
      margin: 0px;
      font-size: 12vmin;
    }
  }

  @media screen and (orientation: portrait) and (min-width: 300px) {
    div {
      margin-bottom: 7%;
    }

    h2 {
      font-size: 15vmin;
      margin: 0px;
    }

    h3 {
      font-size: 7.5vmin;
      margin-bottom: 9px;
    }

    h5 {
      margin: 0px;
      font-size: 10vmin;
    }
  }

  @media screen and (orientation: portrait) and (min-width: 500px) {
    div {
      margin-bottom: 3%;
    }

    h2 {
      font-size: 10vmin;
      margin: 0px;
    }

    h3 {
      font-size: 5vmin;
      margin-bottom: 9px;
    }

    h5 {
      margin: 0px;
      font-size: 7vmin;
    }
  }

  @media screen and (orientation: portrait) and (min-width: 700px) {
    div {
      margin-bottom: 4%;
    }

    h2 {
      font-size: 9vmin;
      margin: 0px;
    }

    h3 {
      font-size: 4.5vmin;
      margin-bottom: 9px;
    }

    h5 {
      margin: 0px;
      font-size: 7vmin;
    }
  }


  /* @media screen and (max-height: 500px)
    h2,
    h5 {
      font-size: 12vmin;
    }

    h3 {
      font-size: 6vmin;
      margin-bottom: 12px;
    }
  }

  @media screen and (max-width: 1600px) and (min-height: 500px) {
    padding: 5%;

    h2,
    h5 {
      font-size: 12vmin;
    }

    h3 {
      font-size: 6vmin;
      margin-bottom: 12px;
    }
  }

  @media screen and (max-width: 1300px) and (min-height: 500px) {
    padding: 7%;
    h2,
    h5 {
      font-size: 10vmin;
    }

    h3 {
      font-size: 5vmin;
      margin-bottom: 12px;
    }
  }

  @media screen and (max-width: 1100px) and (min-height: 500px) {
    margin: 0px;

    h2, h5 {
      font-size: 9vmin;
    }

    h3 {
      font-size: 4.5vmin;
      margin-bottom: 7px;
    }
  }

  @media screen and (max-width: 900px) and (min-height: 500px) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 0;

    div {
      margin: 10px;
      margin-bottom: 25px;
    }

    h2 {
      font-size: 9vmin;
    }

    h3 {
      font-size: 4.5vmin;
      margin-bottom: 9px;
    }

    h5 {
      font-size: 8vmin;
    }
  }

  @media screen and (max-width: 900px) and (min-height: 500px) {
    h2, h5 {
      font-size: 11vmin;
    }

    h3 {
      font-size: 5.5vmin;
      margin-bottom: 9px;
    }
  }

  @media screen and (max-width: 700px) and (min-height: 500px) {
    padding-top: 5%;

    div {
      margin: 0px;
      margin-bottom: 20px;
    }

    h2 {
      font-size: 12vmin;
      margin: 0;
    }

    h3 {
      font-size: 6vmin;
      margin: 0;
      margin-bottom: 8px;
      margin-left: 10%;
    }

    h5 {
      font-size: 8vmin;
    }
  }

  /* @media screen and (max-width: 700px) and (min-height: 500px) and (orientation: portrait) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 2%;
    
    div {
      margin-bottom: 35px;
    }
  } */
/* 
  @media screen and (max-width: 500px) {
    div {
      margin: 0px;
      margin-bottom: 25px;
    }

    h2 {
      font-size: 16vmin;
      margin: 0;
    }

    h3 {
      font-size: 8vmin;
      margin: 0;
      margin-bottom: 10px;
      margin-left: 10%;
    }

    h5 {
      font-size: 10vmin;
    }
  } */
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
