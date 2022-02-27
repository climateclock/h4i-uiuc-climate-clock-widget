import { Div, LabelDiv, Title, Module, Value, Content, Unit } from './styles'
import { LifelinePropsInterface } from '../interfaces'
import { useState, useEffect } from 'react'

function Lifeline(props: LifelinePropsInterface) {
  const seconds = 1 // running every every seconds * 1000
  const decimalPlaces = !props.resolution ? 0 : Math.log10(1 / props.resolution) // set the precision of value (ie. props.resolution = 1e-9 => 9)
  const rate = !props.rate ? 0 : props.rate // store rate at which to update value
  const isMoneyVal = !props.unit || props.unit.charAt(0) !== '$' ? false : true // used to fix monetary units passed in (ie. $)
  const [value, setValue] = useState<number>(
    !props.value ? rate : props.value + rate,
  )

  useEffect(() => {
    // update value within interval
    let interval = setInterval(() => {
      if (rate !== 0) {
        setValue((value) => value + rate)
      }
    }, seconds * 1000)

    return () => {
      clearInterval(interval)
    }
  })

  return (
    <Div>
      <LabelDiv>
        <Module>{props.module_type}</Module>
        <Title>{props.title}</Title>
      </LabelDiv>
      <Content>
        <Value>
          {isMoneyVal && '$'}
          {rate === 0 ? value : value.toFixed(decimalPlaces)}
        </Value>
        <Unit> {!isMoneyVal ? props.unit : props.unit.substring(1)}</Unit>
      </Content>
    </Div>
  )
}

export default Lifeline
