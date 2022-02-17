import React, { FC, ReactElement } from 'react'
import styled from 'styled-components'

interface ExampleProps {
  exampleProp: string
}

const StyledDiv = styled.div`
  background: blue;
`

// Comment describing component
export const Example: FC<ExampleProps> = ({ exampleProp }): ReactElement => (
  <StyledDiv className="example-wrapper">
    <h1 id="component-header">{exampleProp}</h1>
  </StyledDiv>
)
