import moment from 'moment'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ModuleResInterface } from '../../interfaces'
import { toUpperCase } from '../../utils/utils'
import Header from '../ui/Header'

const ClockSection = styled.div`
  color: ${({ theme }) => theme.text};
  font-family: ${({ theme }) => theme.fonts};

  @media only screen and (max-height: 700px) {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;
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

  @media only screen and (min-width: 1025px) {
    height: auto;
    width: 50%;
  }

  // code for stacking
  @media only screen and (max-width: 1024px) {
    height: 45vh;
    width: 100%;
  }
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
