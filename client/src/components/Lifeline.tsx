import { LifelinePropsInterface } from '../interfaces'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

/* TODO: change these to theme colors */
const TEAL: string = '#4aa1cc'
const BLACK: string = '#000000'
const PADDING: number = 1
const VALUE_UNIT_MARGIN: number = 1

export const Container = styled.div`
  & {
    font: ${({ theme }) => theme.fonts};
    font-weight: 900;
    background: ${TEAL};
    height: 100%;
    width: 100vw;
  }
`

export const LabelContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: max(1rem, min(2rem, 3vw));
`

export const Title = styled.div`
  width: 100%;
  background: ${BLACK};
  color: ${TEAL};
  padding: 0 2%;
`

export const Module = styled.div`
  padding: ${PADDING}% ${PADDING}%;
  text-align: center;
`

export const ContentContainer = styled(LabelContainer)`
  width: 100%;
`

export const Value = styled.div`
  font-size: 3em;
  margin-right: ${VALUE_UNIT_MARGIN}vw;
  margin-left: ${VALUE_UNIT_MARGIN}vw;
`

export const Unit = styled.div`
  font-size: 2em;
  margin-left: ${VALUE_UNIT_MARGIN}vw;
`

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
