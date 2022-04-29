import styled from 'styled-components'
import Input from '../ui/Input'
import { useState } from 'react'

const ButtonContainer = styled.div`
  display: flex;
  margin-left: 5%;
`

const Button = styled.button`
  border-radius 0px 5px 5px 0px;
  margin: 0;
  background-color: ${({ theme }) => theme.navy};
  color: white;
  border: 0;
`

const CopyButton = () => {
  const [buttonText, setButtonText] = useState('Copy Link')
  const changeText = (text) => setButtonText(text)
  let placeholder = 'https://clock.climateclock.world/oGpVDQKb95lh'
  return (
    <>
      <ButtonContainer>
        <Input
          type="text"
          placeholder="https://clock.climateclock.world/oGpVDQKb95lh"
          font-size="12px"
          line-height="25px"
          width="700px"
          height="31px"
        />
        <Button
          onClick={() => {
            navigator.clipboard.writeText(placeholder)
            changeText('Copied')
          }}
        >
          {buttonText}
        </Button>
      </ButtonContainer>
    </>
  )
}

export default CopyButton
