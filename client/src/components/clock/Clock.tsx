import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import { IsMobileContext } from '../../App'
import { ClockProps } from '../../interfaces'
import { NUM_LIFELINES_DISPLAYED } from '../../utils/constants'
import { toUpperCase } from '../../utils/utils'
import Header from '../ui/Header'

const TempContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  // subtracting header height from container in order to center content
  height: calc(100% - 4px - 3vh);

  @media only screen and (max-height: 700px) {
    height: calc(100% - 4px - 17.65%);
  }
`

const ClockSection = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 20vh;
  font-family: ${({ theme }) => theme.fonts};
  text-align: center;
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  font-weight: bold;

  div {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: flex-end;
    margin: 0px 20px 0px 20px;
  }

  @media screen and (orientation: landscape) and (min-width: 300px) {
    h2,
    h5 {
      font-size: max(4vw, min(4rem, 6vh));
      margin: 0%;
    }

    h3 {
      font-size: max(2.75vw, min(3.25rem, 4vh));
      margin: 0px 1px 0 1px;
      align-self: flex-end;
      margin-bottom: 1px;
    }
  }

  @media screen and (orientation: landscape) and (min-width: 450px) {
    h2,
    h5 {
      font-size: max(5.5vw, min(6.5rem, 8vh));
      margin: 0%;
    }

    h3 {
      font-size: max(2.75vw, min(3.25rem, 4vh));
      margin: 0px 3px 0 3px;
      align-self: flex-end;
      margin-bottom: 3px;
    }
  }

  @media screen and (orientation: landscape) and (min-width: 750px) {
    h2,
    h5 {
      font-size: max(4.5vw, min(4rem, 8vh));
      margin: 0%;
    }

    h3 {
      font-size: max(2.75vw, min(3.25rem, 4vh));
      margin: 0px 5px 0 5px;
      align-self: flex-end;
      margin-bottom: 5px;
    }
  }

  @media screen and (orientation: landscape) and (min-width: 900px) {
    h2,
    h5 {
      font-size: max(5.5vw, min(4.5rem, 9vh));
      margin: 0%;
    }

    h3 {
      font-size: max(2.75vw, min(3.25rem, 4vh));
      margin: 0px 7px 0 7px;
      align-self: flex-end;
      margin-bottom: 7px;
    }
  }

  @media screen and (orientation: landscape) and (min-width: 1000px) {
    h2,
    h5 {
      font-size: max(6.5vw, min(5.5rem, 12vh));
      margin: 0%;
    }

    h3 {
      font-size: max(3.75vw, min(2.75rem, 6vh));
      margin: 0px 9px 0 9px;
      align-self: flex-end;
      margin-bottom: 9px;
    }
  }

  @media screen and (orientation: landscape) and (min-width: 1500px) {
    h3 {
      margin-bottom: 12px;
    }
  }

  @media screen and (orientation: landscape) and (min-width: 2000px) {
    h2,
    h5 {
      font-size: max(7.5vw, min(6rem, 15vh));
      margin: 0%;
    }

    h3 {
      font-size: max(3.75vw, min(3.25rem, 4vh));
      margin: 0px 15px 0 15px;
      align-self: flex-end;
      margin-bottom: 19px;
    }
  }

  @media screen and (orientation: portrait) and (min-height: 600px) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    div {
      margin-bottom: 12px;
    }

    h2 {
      font-size: max(11vw, min(6rem, 9vh));
      margin: 0%;
    }

    h3 {
      font-size: max(5.5vw, min(3rem, 4.5vh));
      margin: 0px 7px 0 7px;
      align-self: flex-end;
      margin-bottom: 7px;
    }

    h5 {
      font-size: max(7vw, min(4rem, 6vh));
      margin: 0%;
    }
  }

  @media screen and (orientation: portrait) and (min-height: 800px) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    h2 {
      font-size: max(10vw, min(7rem, 12vh));
      margin: 0%;
    }

    h3 {
      font-size: max(5vw, min(3.5rem, 6vh));
      margin: 0px 7px 0 7px;
      align-self: flex-end;
      margin-bottom: 7px;
    }

    h5 {
      font-size: max(8vw, min(5rem, 9vh));
    }
  }

  @media screen and (orientation: portrait) and (max-width: 450px) and (min-height: 800px) {
    h2 {
      font-size: max(6.5vw, min(4.5rem, 9vh));
      margin: 0%;
    }

    h3 {
      font-size: max(3.75vw, min(2.75rem, 4.5vh));
      margin: 0px 7px 0 7px;
      align-self: flex-end;
      margin-bottom: 7px;
    }

    h5 {
      font-size: max(5vw, min(4rem, 7vh));
    }
  }

  @media screen and (orientation: portrait) and (max-width: 300px) and (min-height: 800px) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    h2 {
      font-size: max(6.5vw, min(4.5rem, 9vh));
      margin: 0%;
    }

    h3 {
      font-size: max(2.75vw, min(3.25rem, 4vh));
      margin: 0px 7px 0 7px;
      align-self: flex-end;
      margin-bottom: 7px;
    }

    h5 {
      font-size: max(5vw, min(3.75rem, 6vh));
    }
  }
`

const ClockContainer = styled.div`
  font-family: ${({ theme }) => theme.fonts};
  font-weight: bold;
  background: ${({ theme }) => theme.red};

  ${(props) =>
    props.isMobile
      ? `height: calc(100vh - 55px - 10vh - 25vh * ${Math.min(
          1,
          props.numLifelines,
        )})`
      : `height: calc(100vh - 55px - 4vh - 14.5vh * ${Math.min(
          NUM_LIFELINES_DISPLAYED,
          props.numLifelines,
        )})`};
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

  const isMobile = useContext(IsMobileContext)

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
      isMobile={isMobile}
    >
      <Header
        moduleType={flavor ? toUpperCase(flavor) : ''}
        title={labels ? (labels[0] ? labels[0] : '') : ''}
        themeColor={({ theme }) => theme.red}
      />
      <TempContainer>
        <ClockSection>
          <div>
            <h2>{years ? years : '0'}</h2> <h3>YRS</h3>
          </div>
          <div>
            <h2>{days ? days : '000'}</h2> <h3>DAYS</h3>
          </div>
          <div>
            <h5>{time ? time : '00:00:00'}</h5>
          </div>
        </ClockSection>
      </TempContainer>
    </ClockContainer>
  )
}

export default Clock
