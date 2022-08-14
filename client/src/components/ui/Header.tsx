import PropTypes from 'prop-types'
import styled from 'styled-components'

const HeaderBorder = styled.div`
  height: 4px;
  background: ${({ theme }) => theme.black};
`

const LabelContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  font-size: max(1rem, min(2rem, 3vw));
  height: 4vh;

  @media only screen and (max-width: 1200px) {
    font-size: max(0.9rem, min(1rem, 2vw));
  }

  @media only screen and (max-width: 800px) {
    font-size: max(0.85rem, min(1rem, 2vw));
  }

  @media only screen and (max-width: 600px) {
    font-size: max(0.8rem, min(1rem, 2vw));
  }

  @media only screen and (max-width: 400px) {
    font-size: max(0.75rem, min(1rem, 2vw));
  }

  @media only screen and (max-height: 700px) {
    margin-bottom: 0px;
    height: 17.65%; // 15% of 85
  }
`

const Module = styled.div`
  display: flex;
  align-items: center;
  padding-right: min(35px, 3vw);
  text-align: center;
  margin-left: min(35px, 3vw);

  @media only screen and (max-height: 700px) {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`

const Title = ({ color, ...props }) => <div {...props}></div>

Title.propTypes = {
  color: PropTypes.func.isRequired,
}

const StyledTitle = styled(Title)`
  display: flex;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.black};
  padding: 0 2%;
  opacity: 100%;
  color: ${(props) => props.color};

  @media only screen and (max-height: 700px) {
    padding-top: 10px;
    padding-bottom: 10px;
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
