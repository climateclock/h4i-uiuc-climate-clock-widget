import styled from 'styled-components'

const TEAL: string = '#4aa1cc'
const BLACK: string = '#000000'
const PADDING: number = 2
const VALUE_UNIT_MARGIN: number = 0.5

export const Div = styled.div`
  & {
    font: ${({ theme }) => theme.fonts};
    font-weight: bold;
    background: ${TEAL};
    height: 100%;
    width: 100vw;
  }
`

export const LabelDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: max(1rem, min(2rem, 3vw));
`

export const Title = styled.div`
  width: 80%;
  background: ${BLACK};
  color: ${TEAL};
  padding: 0 ${PADDING}%;
`

export const Module = styled.div`
  width: 20%;
  padding: 0 ${PADDING}%;
`

export const Content = styled(LabelDiv)`
  width: 100%;
  padding: ${PADDING}% ${PADDING}%;
`

export const Value = styled.div`
  font-size: 2em;
  margin-right: ${VALUE_UNIT_MARGIN}vw;
`

export const Unit = styled.div`
  font-size: 1em;
  margin-left: ${VALUE_UNIT_MARGIN}vw;
`
