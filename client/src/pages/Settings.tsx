import { compressToEncodedURIComponent } from 'lz-string'
import { useEffect, useState, useState } from 'react'
import { useFullScreenHandle } from 'react-full-screen'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

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

const SettingSubheading = styled.div<{ isTopSetting?: boolean }>`
  color: ${({ theme }) => theme.text};
  font-family: ${({ theme }) => theme.secondaryFonts};
  margin-left: 5%;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  // top margin should only be applied to settings that are not the first (right under "Clock Settings")
  margin-top: ${(props) => (props.isTopSetting ? '1%' : '3%')};
`

const SettingCaption = styled.div`
  color: ${({ theme }) => theme.text};
  font-family: ${({ theme }) => theme.secondaryFonts};
  margin-left: 5%;
  font-weight: 575;
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
`
const SelectContainer = styled.div`
  margin-left: 5%;
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
  const [languageSelected, setLanguageSelected] = useState<string>()
  const handleLanguageSelectedChange = (language: string) => {
    setLanguageSelected(language)
  }
  return (
    <>
      <NavBar isFullScreen={true} atHome={false} handle={handle}></NavBar>
      <SettingsHeading>Clock Settings</SettingsHeading>
      <SettingSubheading id="language" isTopSetting={true}>
        Configure Language
      </SettingSubheading>
      <SettingCaption> Language </SettingCaption>
      <SelectContainer>
        <StyledSelect
          options={options}
          optionSelected={languageSelected}
          handleOptionSelectedChange={handleLanguageSelectedChange}
        />
      </SelectContainer>
      <SettingSubheading id="share">Share your custom clock</SettingSubheading>
      <SettingCaption> Shareable Link </SettingCaption>
      <SettingsText>Copy this URL to share your clock with others</SettingsText>
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
    </>
  )
}

export default Settings
