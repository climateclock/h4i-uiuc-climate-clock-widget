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

function Clock({ timestamp, labels, flavor }: ModuleResInterface) {
  const [timeLeft, setTimeLeft] = useState(0)
  const [years, setYears] = useState('')
  const [days, setDays] = useState('')
  const [time, setTime] = useState('')
  useEffect(() => {
    if (timestamp) {
      setTimeLeft(moment(timestamp).diff(moment()))
    }
  }, [timestamp])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(moment(timeLeft).subtract(1, 'seconds').valueOf())
      setYears(moment.duration(timeLeft).years().toString())
      setDays(moment.utc(timeLeft).format('DDDD'))
      setTime(moment.utc(timeLeft).format('hh:mm:ss'))
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft])

  return (
    <ClockContainer>
      <Header
        moduleType={flavor ? toUpperCase(flavor) : ''}
        title={labels ? (labels[0] ? labels[0] : '') : ''}
        themeColor={({ theme }) => theme.red}
      />
      <ClockSection>
        <h3>{years ? years : '0'}</h3> <h2>YRS</h2>
        <h3>{days ? days : '000'}</h3> <h2>DAYS</h2>
        <h3>{time ? time : '00:00:00'}</h3>
      </ClockSection>
    </ClockContainer>
  )
}

export default Clock
