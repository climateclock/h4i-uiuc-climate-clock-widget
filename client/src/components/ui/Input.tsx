import styled from 'styled-components'

const Input = styled.input`
  top: 3rem;
  border-radius 5px 0px 0px 5px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.secondaryBackground};
  padding 8px;
  width: ${(props) => props.width || '10rem;'};
  font-family: ${({ theme }) => theme.secondaryFont};
  &:focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.blue}
  }
`
export default Input
