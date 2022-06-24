import { compressToEncodedURIComponent } from 'lz-string'
import { useEffect, useState } from 'react'
import { useFullScreenHandle } from 'react-full-screen'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Toggle from '../components/buttons/Toggle'
import CopyButton from '../components/ui/CopyButton'
import NavBar from '../components/ui/NavBar'
import { StyledSelect } from '../components/ui/Select'
import { Option, options } from '../components/utils/constants'
import { UpdateSettings } from '../routing/UpdateSettings'
import { UpdateURL } from '../routing/UpdateURL'
import {
  COMPRESSED_KEY,
  LANGUAGE_LOCAL_STORAGE_KEY,
  LIFELINES_LOCAL_STORAGE_KEY,
} from '../utils/constants'
import facebook from '../utils/icons/facebook.png'
import instagram from '../utils/icons/instagram.png'
import twitter from '../utils/icons/twitter.png'
import whatsapp from '../utils/icons/whatsapp.png'

const SettingsHeading = styled.div`
  color: ${({ theme }) => theme.headerText};
  font-size: 30px;
  font-family: ${({ theme }) => theme.secondaryFonts};
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  display: flex;
  align-items: center;
  margin-left: 5%;
  padding-top: 2%;
`

const SettingSubheading = styled.div`
  color: ${({ theme }) => theme.text};
  font-family: ${({ theme }) => theme.secondaryFonts};
  margin-left: 5%;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  padding-top: 1%;
  padding-bottom: 0.25%;
`

const SettingCaption = styled.div`
  color: ${({ theme }) => theme.text};
  font-family: ${({ theme }) => theme.secondaryFonts};
  margin-left: 5%;
  font-weight: 350;
  font-size: 1rem;
  line-height: 24px;
  padding-top: 1%;
  padding-bottom: 0.5%;
`

const SettingsText = styled.div`
  color: ${({ theme }) => theme.text};
  font-family: ${({ theme }) => theme.secondaryFonts};
  margin-left: 5%;
  font-size: 0.75rem;
  line-height: 24px;
  padding-top: 1%;
`

const IconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 5%;
  gap: 2.5%;
`

const ToggleContainer = styled.div`
  display: flex;
  gap: 2%;
`

const ToggleStyle = styled.div`
  padding-top: 1%;
`

function Settings() {
  const handle = useFullScreenHandle()
  const navigate = useNavigate()
  const [selectedLanguage, setSelectedLanguage] = useState<Option>(options[0])

  useEffect(() => {
    UpdateURL(navigate, setSelectedLanguage, null)
    UpdateSettings(selectedLanguage.value, setSelectedLanguage, null, null)
  }, [navigate, selectedLanguage.value, setSelectedLanguage])

  const checkLanguage = (option: Option | null) => {
    console.log(option)
    if (option != null) {
      setSelectedLanguage(option)
      if (option.value !== localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY)) {
        const json = {
          language: option.value,
          lifelines: localStorage.getItem(LIFELINES_LOCAL_STORAGE_KEY),
        }
        const settings_json = JSON.stringify(json)
        const compressed = compressToEncodedURIComponent(settings_json)

        localStorage.setItem(COMPRESSED_KEY, compressed)
        navigate(`${compressed}`)
      }
      localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, option.value)
      console.log(selectedLanguage)
    }
  }
  return (
    <>
      <NavBar handle={handle} isFullScreen={true} atHome={false}></NavBar>
      <SettingsHeading>Clock Settings</SettingsHeading>

      <ToggleContainer>
        <SettingSubheading id="news_ticker"> News Ticker</SettingSubheading>
        <ToggleStyle>
          <Toggle />
        </ToggleStyle>
      </ToggleContainer>

      <SettingsText> Turn off/on the bottom news on your clock</SettingsText>
      <SettingSubheading id="language">Configure Language</SettingSubheading>
      <SettingCaption> Language </SettingCaption>
      <StyledSelect
        options={options}
        onChange={(option) => checkLanguage(option)}
        value={selectedLanguage}
      />
      <SettingSubheading id="share">Share your custom clock</SettingSubheading>
      <SettingCaption> Shareable Link </SettingCaption>
      <CopyButton
        type="link"
        placeholder="https://clock.climateclock.world/oGpVDQKb95lh"
      />
      <SettingCaption>Embed</SettingCaption>
      <SettingsText>
        To add the Climate Clock widget to your site, add the following HTML:
      </SettingsText>
      <CopyButton
        type="embed"
        placeholder='<iframe src="https://climateclock.world/widget-v2.js" async></iframe><climate-clock /><sc '
      />
      <SettingCaption>Social Media</SettingCaption>
      <IconContainer>
        <img src={facebook} alt="facebook" />
        <img src={instagram} alt="instagram" />
        <img src={twitter} alt="twitter" />
        <img src={whatsapp} alt="whatsapp" />
      </IconContainer>
    </>
  )
}

export default Settings
