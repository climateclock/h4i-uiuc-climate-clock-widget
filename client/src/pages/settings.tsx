import LanguageCustomization from '../components/settings/LanguageCustomizationForm'
import styled from 'styled-components'
import facebook from '../utils/icons/facebook.png'
import instagram from '../utils/icons/instagram.png'
import twitter from '../utils/icons/twitter.png'
import whatsapp from '../utils/icons/whatsapp.png'

const SettingsContainer = styled.div`
  margin-left: 2em;
`

const SettingsTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts};
  font-size: 1.625rem;
  margin-top: 1em;
  font-color: ${({ theme }) => theme.blue};
  font-weight: bold;
`

const HeadingTitle = styled.div`
  font-size: 1.25rem;
  margin-top: 1.5em;
  font-color: ${({ theme }) => theme.blue};
  margin-bottom: 0.5em;
`

const SubheadingTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts};
  font-size: 1rem;
  margin-top: 1em;
  font-color: ${({ theme }) => theme.blue};
  margin-bottom: 0.5em;
`

const SettingsText = styled.div`
  margin-top: 0.75rem;
  font-size: 0.75rem;
`

const EmbedText = styled.div`
  margin-top: 0.75rem;
  font-size: 0.75rem;
  font-color: ${({ theme }) => theme.blue};
`

const IconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

function Settings() {
  return (
    <>
      <SettingsContainer>
        <SettingsTitle>Clock Settings</SettingsTitle>

        <HeadingTitle>News Ticker</HeadingTitle>
        <SettingsText>Turn off/on the bottom news on your clock, </SettingsText>
        <HeadingTitle>Configure Language</HeadingTitle>
        <LanguageCustomization />
        <HeadingTitle>Share Your Custom Clock</HeadingTitle>
        <SubheadingTitle>Shareable Link</SubheadingTitle>
        <IconContainer>
          <form>
            <SettingsText>
              https://clock.climateclock.world/oGpVDQKb95lh
            </SettingsText>
          </form>
          <button>Copy Link</button>
        </IconContainer>
        <SubheadingTitle>Embed</SubheadingTitle>
        <SettingsText>
          To add the Climate Clock widget to your site, add the following HTML:
        </SettingsText>
        <IconContainer>
          <form>
            <SettingsText>
              script src = "https://climateclock.world/widget-v2.js" async
              '/script' ...
            </SettingsText>
          </form>
          <button>Copy Link</button>
        </IconContainer>
        <EmbedText>Copy Embed Code</EmbedText>
        <SubheadingTitle>Social Media</SubheadingTitle>
        <IconContainer>
          <img src={facebook} alt="facebook" />
          <img src={instagram} alt="instagram" />
          <img src={twitter} alt="twitter" />
          <img src={whatsapp} alt="whatsapp" />
        </IconContainer>
      </SettingsContainer>
    </>
  )
}

export default Settings
