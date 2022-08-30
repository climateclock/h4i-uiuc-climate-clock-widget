import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ModuleResInterface } from '../../interfaces'
import { countdown } from '../../utils/countdown'
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

const Value = styled.div`
  margin-left: 1vw;
  @media only screen and (max-height: 700px) {
    font-size: max(7vh, min(2.75rem, 12vw));
  }

  // code for stacking
  @media only screen and (max-width: 1024px) {
    font-size: max(5.5vh, min(2.25rem, 12.5vw));
  }
`

const Unit = styled.div`
  margin-left: 0.5vw;
  @media only screen and (max-height: 700px) {
    font-size: max(3.5vh, min(1.5rem, 5vw));
    margin-bottom: -7.5vh;
  }

  // code for stacking
  @media only screen and (max-width: 1024px) {
    font-size: max(4vh, min(1.5rem, 5vw));
    margin-bottom: -5vh;
  }
`

function Clock({ timestamp, labels, flavor }: ModuleResInterface) {
  const [deadline, setDeadline] = useState(new Date())
  const [years, setYears] = useState('')
  const [days, setDays] = useState('')
  const [time, setTime] = useState('')

  useEffect(() => {
    if (timestamp) {
      setDeadline(new Date(timestamp))
    }
  }, [timestamp])

  useEffect(() => {
    const interval = setInterval(() => {
      const cd = countdown(
        new Date(),
        deadline,
        countdown.YEARS |
          countdown.DAYS |
          countdown.HOURS |
          countdown.MINUTES |
          countdown.SECONDS,
      )
      setYears(cd.years)
      setDays(cd.days)
      setTime(`${cd.hours}:${cd.minutes}:${cd.seconds}`)
    }, 1000)

    return () => clearInterval(interval)
  }, [deadline])

  return (
    <ClockContainer>
      <Header
        moduleType={flavor ? toUpperCase(flavor) : ''}
        title={labels ? (labels[0] ? labels[0] : '') : ''}
        themeColor={({ theme }) => theme.red}
      />
      <ClockSection>
        <Value>{years ? years : '0'}</Value> <Unit>YRS</Unit>
        <Value>{days ? days : '000'}</Value> <Unit>DAYS</Unit>
        <Value>{time ? time : '00:00:00'}</Value>
      </ClockSection>
    </ClockContainer>
  )
}

export default Clock
