import moment from 'moment'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ClockProps } from '../../interfaces'
import { NUM_LIFELINES_DISPLAYED } from '../../utils/constants'
import { toUpperCase } from '../../utils/utils'
import Header from '../ui/Header'

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
    font-size: max(5.5rem, min(6.5rem, 8vw));
    margin: 0%;
  }

  h3 {
    font-size: max(2.75rem, min(3.25rem, 4vw));
    margin: 0%;
    margin-left: 15px;
    align-self: flex-end;
    margin-bottom: 17px;
  }

  // This style deals with padding for when there is only one lifeline
  @media screen and (max-height: 700px) {
    padding-top: calc(10vh + 2%);
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
    h2,
    h5 {
      font-size: max(4rem, min(5rem, 6vw));
    }

    h3 {
      font-size: max(2rem, min(2.5rem, 3vw));
      margin-bottom: 9px;
    }
  }

  @media screen and (max-width: 700px) and (max-height: 800px) {
    h2,
    h5 {
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

  @media screen and (max-height: 400px) {
    display: flex;
    flex-wrap: nowrap;
    justify-content: left;
    margin: 0px;
    padding: 0px;

    div {
      margin: 0px;
    }

    h3 {
      font-size: 6vw;
      margin: 0px;
    }

    h2 {
      font-size: 2vw;
      margin: 0px;
      margin-bottom: 15px;
    }
  }
`

const ClockContainer = styled.div`
  height: calc(
    100vh - 55px - 4vh -
      (
        ${(props) => Math.min(NUM_LIFELINES_DISPLAYED, props.numLifelines)} *
          14.5vh
      )
  );
  font-family: ${({ theme }) => theme.fonts};
  font-weight: bold;
  background: ${({ theme }) => theme.red};
  @media only screen and (max-height: 700px) {
    height: calc(
      100vh - 55px - 10vh -
        (${(props) => Math.min(1, props.numLifelines)} * 25vh)
    );
  }
  width: 100vw;
`

function Clock({
  isFullScreen,
  timestamp,
  labels,
  flavor,
  numLifelines,
}: ClockProps) {
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

  const [mobileWidth, setMobileWidth] = useState(
    window.matchMedia('(max-width: 800px)').matches,
  )
  useEffect(() => {
    window
      .matchMedia('(max-width: 800px)')
      .addEventListener('change', (e) => setMobileWidth(e.matches))
  }, [])

  return (
    <ClockContainer
      isFullScreen={isFullScreen}
      mobileWidth={mobileWidth}
      numLifelines={numLifelines}
    >
      <Header
        moduleType={flavor ? toUpperCase(flavor) : ''}
        title={labels ? (labels[0] ? labels[0] : '') : ''}
        themeColor={({ theme }) => theme.red}
      />
      <ClockSection>
        <h2>{years ? years : '0'}</h2> <h3>YRS</h3>
        <h2>{days ? days : '000'}</h2> <h3>DAYS</h3>
        <h2>{time ? time : '00:00:00'}</h2>
      </ClockSection>
    </ClockContainer>
  )
}

export default Clock
