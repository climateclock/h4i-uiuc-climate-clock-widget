import styled from 'styled-components'

export const StyledDiv = styled.div`
  background: #4aa1cc;
  height: 100%;
  width: 100vw;
`

export const InlineStyle = styled.div`
  && {
    display: flex;
    justify-content: flex-start;
    font-size: max(1rem, min(2rem, 3vw));
  }
`

export const TitleInlineStyle = styled.div`
  width: 20%;
  background: #000000;
  color: #4aa1cc;
`

export const ModuleInlineStyle = styled.div`
  width: 80%;
`

export const ValueInlineStyle = styled.div`
  font-size: $(({theme}) => theme.secondaryText);
`

export const UnitInlineStyle = styled.div`
  font-size: $(({theme}) => theme.tertiaryText);
`
