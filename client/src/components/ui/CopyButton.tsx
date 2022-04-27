import styled from 'styled-components'
import Input from '../ui/Input'

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
          }}
        >
          Copy Link
        </Button>
      </ButtonContainer>
    </>
  )
}

export default CopyButton
