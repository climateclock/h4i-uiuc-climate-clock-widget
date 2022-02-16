import {
  StyledDiv,
  InlineStyle,
  TitleInlineStyle,
  ModuleInlineStyle,
  ValueInlineStyle,
  ContentInlineStyle,
  UnitInlineStyle,
} from './styles'

interface LifelinePropsInterface {
  title: string
  module_type: string
  value: string
  unit: string
}

function Lifeline(props: LifelinePropsInterface) {
  return (
    <StyledDiv>
      <InlineStyle>
        <ModuleInlineStyle> {props.module_type}</ModuleInlineStyle>
        <TitleInlineStyle>{props.title}</TitleInlineStyle>
      </InlineStyle>
      <ContentInlineStyle>
        <ValueInlineStyle> {props.value}</ValueInlineStyle>
        <UnitInlineStyle> {props.unit}</UnitInlineStyle>
      </ContentInlineStyle>
    </StyledDiv>
  )
}

export default Lifeline
