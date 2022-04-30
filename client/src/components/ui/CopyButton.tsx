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

const CopyButton = ({
  type,
  placeholder,
}: {
  type: string
  placeholder: string
}) => {
  const [buttonText, setButtonText] = useState('Copy Link')
  const changeText = (text) => setButtonText(text)
  return (
    <>
      <ButtonContainer>
        {type === 'link' ? (
          <Input
            type="text"
            placeholder={placeholder}
            font-size="12px"
            line-height="25px"
            height="31px"
            width="10rem"
          />
        ) : (
          <Input
            type="text"
            placeholder={placeholder}
            font-size="12px"
            line-height="25px"
            height="31px"
            width="20rem"
          />
        )}

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
