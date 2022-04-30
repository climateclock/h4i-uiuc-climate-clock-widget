import styled from 'styled-components'

const Input = styled.input`
  top: 3rem;
  border-radius 5px;
  border-width: 1px;
  left: 9rem;
  border-color: ${({ theme }) => theme.secondaryBackground};
  padding 10px;
  margin: 8px;
  font-family: ${({ theme }) => theme.secondaryFont};
  
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.blue}
  }
`
export default Input
