import styled from 'styled-components'

const TEAL: string = '#4aa1cc'
const BLACK: string = '#000000'
const LR_PADDING: number = 2
const TB_PADDING: number = 2
const VALUE_UNIT_MARGIN: number = 0.5

export const StyledDiv = styled.div`
  & {
    font: ${({ theme }) => theme.fonts};
    font-weight: bold;
    background: ${TEAL};
    height: 100%;
    width: 100vw;
  }
`

export const InlineStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: max(1rem, min(2rem, 3vw));
`

export const TitleInlineStyle = styled.div`
  width: 80%;
  background: ${BLACK};
  color: ${TEAL};
  padding: 0 ${LR_PADDING}%;
`

export const ModuleInlineStyle = styled.div`
  width: 20%;
  padding: 0 ${LR_PADDING}%;
`

export const ContentInlineStyle = styled(InlineStyle)`
  width: 100%;
  padding: ${TB_PADDING}% ${LR_PADDING}%;
`

export const ValueInlineStyle = styled.div`
  font-size: 2em;
  margin-right: ${VALUE_UNIT_MARGIN}vw;
`

export const UnitInlineStyle = styled.div`
  font-size: 1em;
  margin-left: ${VALUE_UNIT_MARGIN}vw;
`
