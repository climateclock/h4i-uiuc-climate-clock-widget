import styled from 'styled-components'
import { useState, useEffect } from 'react'
// import data from '../components/clock/mockdata.json'
import { ModuleResInterface } from '../interfaces'
const ClockSection = styled.div`
  color: ${({ theme }) => theme.text};
  height: 50vh;
  font-size: 20vh;
  font-family: ${({ theme }) => theme.fonts};
  text-align: center;
  background: ${({ theme }) => theme.red};
  position: relative;
  line-height: 0.5em;
  justify-content: center;
  align-items: center;
  h3 {
    display: flex;
    flex-wrap: nowrap;
    font-size: 8.125rem;
    display: inline-block;
  }
  p {
    display: flex;
    flex-wrap: nowrap;
    display: inline-block;
    font-size: 4.063rem;
  }
  @media screen and (max-width: 800px) {
    display: flex;
    flex-wrap: wrap;
    h3 {
      font-size: 0.4em;
    }
    p {
      margin-left: -8%;
      font-size: 0.2em;
    }
  }
`
function Clock(props: ModuleResInterface) {
  let date = new Date()
  let calendar =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  let today =
    date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  let final = calendar + ' ' + today
  let value = new Date(props.timestamp!).valueOf() - new Date(final).valueOf()

  var years = Math.floor(value / 3.154e10)
  var days = Math.floor((value - years * 3.154e10) / 8.64e7)
  var hours = Math.floor((value - years * 3.154e10 - days * 8.64e7) / 3.6e6)
  var formattedHour
  if (hours + 1 < 10) {
    formattedHour = ('0' + hours).slice(-2)
  } else {
    formattedHour = Math.floor(
      (value - years * 3.154e10 - days * 8.64e7) / 3.6e6,
    )
  }

  var minutes = Math.floor(
    (value - years * 3.154e10 - days * 8.64e7 - hours * 3.6e6) / 60000,
  )
  var formattedMinutes
  if (minutes + 1 <= 10) {
    formattedMinutes = ('0' + minutes).slice(-2)
  } else {
    formattedMinutes = Math.floor(
      (value - years * 3.154e10 - days * 8.64e7 - hours * 3.6e6) / 60000,
    )
  }
  var formattedMinutes
  if (minutes + 1 <= 10) {
    formattedMinutes = ('0' + minutes).slice(-2)
  } else {
    formattedMinutes = Math.floor(
      (value - years * 3.154e10 - days * 8.64e7 - hours * 3.6e6) / 60000,
    )
  }
  var seconds = Math.floor(
    (value -
      years * 3.154e10 -
      days * 8.64e7 -
      hours * 3.6e6 -
      minutes * 60000) /
      1000,
  )
  var formattedSeconds
  if (seconds + 1 <= 10) {
    formattedSeconds = ('0' + seconds).slice(-2)
  } else {
    formattedSeconds = Math.floor(
      (value -
        years * 3.154e10 -
        days * 8.64e7 -
        hours * 3.6e6 -
        minutes * 60000) /
        1000,
    )
  }
  const [year, setYear] = useState(0)
  const [day, setDay] = useState(0)
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [sec, setSec] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setYear((years) => years + 1)
      setDay((days) => days + 1)
      setHour((formattedHour) => formattedHour + 1)
      setMinute((formattedMinutes) => formattedMinutes + 1)
      setSec((formattedSeconds) => formattedSeconds + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container">
      <ClockSection>
        {console.log(new Date(props.timestamp!))}
        <h3>{years}</h3> <p>YEARS</p> <h3>{days}</h3> <p>DAYS</p>
        <h3>
          {formattedHour}:{formattedMinutes}:{formattedSeconds}
        </h3>
        {/* {data.data.modules.carbon_deadline_1.timestamp} */}
      </ClockSection>
    </div>
  )
}

export default Clock
