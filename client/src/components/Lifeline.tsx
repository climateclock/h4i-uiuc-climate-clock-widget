import { Div, LabelDiv, Title, Module, Value, Content, Unit } from './styles'
import { LifelinePropsInterface } from '../interfaces'

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
