import {
  Container,
  LabelContainer,
  Title,
  Module,
  Value,
  ContentContainer,
  Unit,
} from './styles'
import { LifelinePropsInterface } from '../interfaces'
import { useState, useEffect } from 'react'

function Lifeline({
  title,
  module_type,
  value,
  resolution,
  rate,
  unit,
}: LifelinePropsInterface) {
  const seconds = 1 // running every every seconds * 1000
  const decimalPlaces = !resolution ? 0 : Math.log10(1 / resolution) // set the precision of value (ie. props.resolution = 1e-9 => 9)
  const cleanedRate = !rate ? 0 : rate // store rate at which to update value
  const isMoneyVal = !unit || unit.charAt(0) !== '$' ? false : true // used to fix monetary units passed in (ie. $)
  const [llVal, setLLVal] = useState<number>(
    !value ? cleanedRate : value + cleanedRate,
  )

  /* update lifeline value within interval */
  useEffect(() => {
    let interval = setInterval(() => {
      if (rate !== 0) {
        setLLVal((llVal) => llVal + cleanedRate)
      }
    }, seconds * 1000)

    return () => {
      clearInterval(interval)
    }
  })

  return (
    <Container>
      <LabelContainer>
        <Module>{module_type}</Module>
        <Title>{title}</Title>
      </LabelContainer>
      <ContentContainer>
        <Value>
          {isMoneyVal && '$'}
          {llVal.toFixed(decimalPlaces)}
        </Value>
        <Unit> {!isMoneyVal ? unit : unit.substring(1)}</Unit>
      </ContentContainer>
    </Container>
  )
}

export default Lifeline
