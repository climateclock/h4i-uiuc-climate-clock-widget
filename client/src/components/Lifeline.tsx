import { Div, LabelDiv, Title, Module, Value, Content, Unit } from './styles'
import { LifelinePropsInterface } from '../interfaces'
import { useState, useEffect } from 'react'

function Lifeline(props: LifelinePropsInterface) {
  const [value, setValue] = useState<number>(!props.value ? 0 : props.value) //TODO: add checs

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let rate: number = !props.rate ? 0 : props.rate
    let intervalID = setInterval(() => {
      let valuePrecise = value + rate * 100000
      setValue(value + rate)
    }, 5)
    // return () => {
    //   clearInterval(intervalID)
    // }
  }, [])

  return (
    <Div>
      <LabelDiv>
        <Module> {props.module_type}</Module>
        <Title>{props.title}</Title>
      </LabelDiv>
      <Content>
        {console.log(value)}
        <Value> {value && value}</Value> {/* TODO: double check this code*/}
        <Unit> {props.unit}</Unit>
      </Content>
    </Div>
  )
}

export default Lifeline
