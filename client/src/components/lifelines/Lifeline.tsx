import { LifelinePropsInterface } from '../../interfaces'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

const PADDING: number = 1
const VALUE_UNIT_MARGIN: number = 1

const Container = styled.div`
  & {
    font-family: ${({ theme }) => theme.fonts};
    font-weight: 900;
    background: ${({ theme }) => theme.blue};
    height: 15.5vh;
    @media only screen and (max-height: 700px) {
      height: 35vh;
    }

    width: 100vw;
  }
`
const LabelContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  /* align-items: center; */
  font-size: max(1rem, min(2rem, 3vw));
  height: 3vh;
  margin-bottom: 32px;

  @media only screen and (max-height: 700px) {
    height: 7vh;
  }
`

const Title = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.black};
  color: ${({ theme }) => theme.blue};
  padding: 0 2%;
`

const Module = styled.div`
  display: flex;
  align-items: center;
  padding: ${PADDING}% ${PADDING}%;
  text-align: center;
`

const ContentContainer = styled(LabelContainer)`
  width: 100%;
`

const Value = styled.div`
  display: flex;
  align-items: center;
  font-size: 3em;
  margin-right: ${VALUE_UNIT_MARGIN}vw;
  margin-left: ${VALUE_UNIT_MARGIN}vw;
  margin-top: 25px;
`

const Unit = styled.div`
  font-size: 2em;
  margin-left: ${VALUE_UNIT_MARGIN}vw;
`
const HeaderBorder = styled.div`
  height: 4px;
  background: ${({ theme }) => theme.black};
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
      <HeaderBorder />
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
