import styled from 'styled-components'

const Input = styled.input`
  top: 3rem;
  border-radius 5px 0px 0px 5px;
  border-width: 1px;
  left: 5%;
  border-color: ${({ theme }) => theme.secondaryBackground};
  padding 8px;
  // margin: 8px;
 
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.blue}
  }
`
export default Input
