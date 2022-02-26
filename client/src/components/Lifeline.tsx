import { Div, LabelDiv, Title, Module, Value, Content, Unit } from './styles'
import { LifelinePropsInterface } from '../interfaces'
import { useState, useEffect } from 'react'

function Lifeline(props: LifelinePropsInterface) {
  const seconds = 0.75
  const decimalPlaces = 12
  const rate = !props.rate ? 0 : props.rate
  const isMoneyVal = !props.unit || props.unit.charAt(0) !== '$' ? false : true
  const [value, setValue] = useState<number>(
    !props.value ? rate : props.value + rate,
  ) //TODO: add checks

  useEffect(() => {
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
