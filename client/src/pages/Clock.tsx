import styled from 'styled-components'
import React, { useState, useEffect } from 'react'
import data from '../components/mockdata.json'

const IntervalExample = () => {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])
}

function Clock() {
  let date = new Date()
  let calendar =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  let today =
    date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  let final = calendar + ' ' + today
  let value =
    new Date(data.data.modules.carbon_deadline_1.timestamp).valueOf() -
    new Date(final).valueOf()

  var years = Math.floor(value / 3.154e10)
  var days = Math.floor((value - years * 3.154e10) / 8.64e7)
  var hours = Math.floor((value - years * 3.154e10 - days * 8.64e7) / 3.6e6)
  var minutes = Math.floor(
    (value - years * 3.154e10 - days * 8.64e7 - hours * 3.6e6) / 60000,
  )
  var seconds = Math.floor(
    (value -
      years * 3.154e10 -
      days * 8.64e7 -
      hours * 3.6e6 -
      minutes * 60000) /
      1000,
  )
  const [year, setYear] = useState(0)
  const [day, setDay] = useState(0)
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [sec, setSec] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setYear((years) => years + 1)
      setDay((days) => days + 1)
      setHour((hours) => hours + 1)
      setMinute((minutes) => minutes + 1)
      setSec((seconds) => seconds + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ClockSection>
      {console.log(new Date(data.data.modules.carbon_deadline_1.timestamp))}
      {years} YEARS {days} DAYS <br />
      {hours}:{minutes}:{seconds}
      {/* {data.data.modules.carbon_deadline_1.timestamp} */}
    </ClockSection>
  )
}
const ClockSection = styled.div`
  color: black;
  height: 50vh;
  font-size: 20vh;
  text-align: center;
  background-color: red;
`
export default Clock
