import styled from 'styled-components'

interface ButtonProps {
  type: 'button' | 'submit' | 'reset' | undefined
  className: string
  buttonLabel: string
}

const Button = ({ type, className, buttonLabel }: ButtonProps) => {
  return (
    <button type={type} className={className}>
      {buttonLabel}
    </button>
  )
}

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.buttonBackground};
  display: inline-block;
  margin: 4px 2px;
  border: none;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: white;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 700;
  padding: 10px 15px;
  font-family: ${({ theme }) => theme.secondaryFonts};
  &:hover {
    background-image: linear-gradient(rgba(0, 0, 0, 0.06) 0 0);
  }
`

// const HideButton = styled(StyledButton)`
//     background: ${({ theme }) => theme.background };
//     border: 1px solid gray;
//     cursor: pointer;
//     text-align: center;
//     text-decoration: none;
//     margin: 4px 2px;
//     display: inline-block;
//     color: ${({ theme }) => theme.text };
//     border-radius: 3px;
//     font-size: 12px;
//     padding: 6.5px 20px;
//     font-weight: 500;
//     font-family:  ${({ theme }) => theme.secondaryFonts };
//     &:hover {
//        background-color: #F1F1F1;
//     }
// `;

export default StyledButton
