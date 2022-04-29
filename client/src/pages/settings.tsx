import { StyledSelect } from '../components/ui/Select'
import styled from 'styled-components'
import CopyButton from '../components/ui/CopyButton'
// import Input from '../components/ui/Input'
import { options } from '../components/utils/constants'
import facebook from '../utils/icons/facebook.png'
import instagram from '../utils/icons/instagram.png'
import twitter from '../utils/icons/twitter.png'
import whatsapp from '../utils/icons/whatsapp.png'
import NavBar from '../components/ui/NavBar'
import { useFullScreenHandle } from 'react-full-screen'

// import { placeholder } from '@babel/types'

const SettingsSection = styled.div`
  h1 {
    color: ${({ theme }) => theme.headerText};
    font-size: 30px;
    font-family: ${({ theme }) => theme.secondaryFonts};
    font-weight: 600;
    font-size: 30px;
    line-height: 36px;
    display: flex;
    align-items: center;
    position: relative;
    top: 5%;
    bottom: 80.47%;
    left: 5%;
  }
  h3 {
    color: ${({ theme }) => theme.text};
    font-family: ${({ theme }) => theme.secondaryFonts};
    position: relative;
    top: 27.89%;
    bottom: 69.44%;
    left: 5%;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
  }
  h4 {
    color: ${({ theme }) => theme.text};
    font-family: ${({ theme }) => theme.secondaryFonts};
    position: relative;
    top: 27.89%;
    bottom: 69.44%;
    left: 5%;
    font-weight: 350;
    font-size: 1rem;
    line-height: 24px;
  }
  p {
    color: ${({ theme }) => theme.text};
    font-family: ${({ theme }) => theme.secondaryFonts};
    position: relative;
    top: 27.89%;
    bottom: 69.44%;
    left: 5%;
    font-size: 0.75rem;
    line-height: 24px;
  }
`

const IconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 5%;
  gap: 2%;
`

function Settings() {
  const handle = useFullScreenHandle()
  return (
    <SettingsSection>
      <NavBar handle={handle} isFullScreen={true} atHome={false}></NavBar>
      <h1>Clock Settings</h1>
      <h3 id="news_ticker"> News Ticker</h3>
      <p> Turn off/on the bottom news on your clock</p>
      <h3 id="language">Configure Language</h3>
      <h4> Language </h4>
      <StyledSelect options={options} />
      <h3 id="share">Share your custom clock</h3>
      <h4> Shareable Link </h4>
      <CopyButton />
      <h4>Embed</h4>
      <p>
        To add the Climate Clock widget to your site, add the following HTML:
      </p>
      <CopyButton />
      <h4>Social Media</h4>
      <IconContainer>
        <img src={facebook} alt="facebook" />
        <img src={instagram} alt="instagram" />
        <img src={twitter} alt="twitter" />
        <img src={whatsapp} alt="whatsapp" />
      </IconContainer>
    </SettingsSection>
  )
}

export default Settings
