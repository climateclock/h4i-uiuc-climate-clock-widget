import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { LifelinePropsInterface } from '../../interfaces'
import Header from '../ui/Header'

const VALUE_UNIT_MARGIN = 1

const Container = styled.div`
  & {
    font-family: ${({ theme }) => theme.fonts};
    font-weight: bold;
    background: ${({ theme }) => theme.blue};

    height: ${(props) => (props.isMobile ? '25vh' : '14.5vh')};

    width: 100vw;
  }
`
const LabelContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: max(1rem, min(1.5rem, 3vw));
  height: 3vh;
  margin-bottom: 32px;

  @media only screen and (max-height: 700px) {
    height: 7vh;
  }
`

const ContentContainer = styled(LabelContainer)`
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(100% - 4px - 3vh);

  @media only screen and (max-height: 700px) {
    height: calc(100% - 4px - 17.65%);
  }
`

const Value = styled.div`
  display: flex;
  align-items: center;
  font-size: 3em;
  margin-left: ${VALUE_UNIT_MARGIN}vw;
`

const Unit = styled.div`
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
  const seconds = 0.1 // running every every seconds * 1000
  const decimalPlaces = !resolution ? 0 : Math.log10(1 / resolution) // set the precision of value (ie. props.resolution = 1e-9 => 9)
  const cleanedRate = !rate ? 0 : rate // store rate at which to update value
  const isMoneyVal = !unit || unit.charAt(0) !== '$' ? false : true // used to fix monetary units passed in (ie. $)
  const [llVal, setLLVal] = useState<number>(
    !value ? cleanedRate : value + cleanedRate,
  )

  /* update lifeline value within interval */
  useEffect(() => {
    const interval = setInterval(() => {
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
      <Header
        moduleType={module_type}
        title={title}
        themeColor={({ theme }) => theme.blue}
      />
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
