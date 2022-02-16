import { Div, LabelDiv, Title, Module, Value, Content, Unit } from './styles'

interface LifelinePropsInterface {
  title: string
  module_type: string
  value: string
  unit: string
}

function Lifeline(props: LifelinePropsInterface) {
  return (
    <Div>
      <LabelDiv>
        <Module> {props.module_type}</Module>
        <Title>{props.title}</Title>
      </LabelDiv>
      <Content>
        <Value> {props.value}</Value>
        <Unit> {props.unit}</Unit>
      </Content>
    </Div>
  )
}

export default Lifeline
