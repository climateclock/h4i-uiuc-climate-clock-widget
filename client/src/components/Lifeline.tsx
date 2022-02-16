import {
  StyledDiv,
  InlineStyle,
  TitleInlineStyle,
  ModuleInlineStyle,
} from './styles'

interface LifelinePropsInterface {
  title: string
  module_type: string
  value: string
  unit: string
}

function Lifeline(props: LifelinePropsInterface) {
  return (
    <>
      <StyledDiv>
        <InlineStyle>
          <ModuleInlineStyle> {props.module_type}</ModuleInlineStyle>
          <TitleInlineStyle> {props.title}</TitleInlineStyle>
        </InlineStyle>
        <InlineStyle>
          <p> {props.value}</p>
          <p> {props.unit}</p>
        </InlineStyle>
      </StyledDiv>
    </>
  )
}

export default Lifeline
