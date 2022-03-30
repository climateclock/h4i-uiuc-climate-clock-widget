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
    height: 25vh;
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

export const MarqueeContainer = styled.div`
  background: ${({ theme }) => theme.black};
  color: ${({ theme }) => theme.blue};
  padding: 0 2%;
  font-size: max(2rem, min(4rem, 6vw));
  font-weight: bold;
`
