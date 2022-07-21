import styled from 'styled-components'

interface TitleProps {
  color: string,
}

const HeaderBorder = styled.div`
  height: 4px;
  background: ${({ theme }) => theme.black};
`

const LabelContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  font-size: max(1rem, min(2rem, 3vw));
  // height: 4vh;

  @media only screen and (max-height: 700px) {
    margin-bottom: 0px;
    font-size: max(1rem, min(2rem, 3vh));
  }
`

const Module = styled.div`
  display: flex;
  align-items: center;
  padding-right: min(35px, 3vw);
  text-align: center;
  margin-left: min(35px, 3vw);

  @media only screen and (max-height: 700px) {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.black};
  padding: 0 2%;
  opacity: 100%;
  color: ${(props : TitleProps) => props.color};

  @media only screen and (max-height: 700px) {
    padding-top: 5px;
    padding-bottom: 5px;
  }
`

interface HeaderProps {
  moduleType: string
  title: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  themeColor: any
}

export default function Header({ moduleType, title, themeColor }: HeaderProps) {
  return (
    <>
      <HeaderBorder />
      <LabelContainer>
        <Module>{moduleType}</Module>
        <StyledTitle color={themeColor}>{title}</StyledTitle>
      </LabelContainer>
    </>
  )
}
