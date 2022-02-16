import React, { FC, ReactElement, useState } from 'react'
import styled from 'styled-components'
import { useEffect } from 'react'
import { get } from '../../api/config'
import { ApiRequestUrl } from '../../api/constants'

interface ExampleProps {
  exampleProp: string
}

interface ApiOutput {
  status: string
}

const StyledDiv = styled.div`
  background: ${({ theme }) => theme.background};
`

// Comment describing component
export const Example: FC<ExampleProps> = ({ exampleProp }): ReactElement => {
  const [exampleData, setExampleData] = useState<any | null>(null)
  async function exampleFunc() {
    const output = await get('/', 'clock')
    setExampleData(output)
  }
  const exampleApi = exampleFunc()
  return (
    <StyledDiv className="example-wrapper">
      <h1 id="component-header">{exampleProp}</h1>
      {exampleData && exampleData.status}
    </StyledDiv>
  )
}
