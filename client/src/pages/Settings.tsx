import styled from 'styled-components'

import LanguageCustomization from '../components/settings/LanguageCustomizationForm'
import Input from '../components/ui/Input'
import { StyledSelect } from '../components/ui/Select'
import { options } from '../components/utils/constants'

const SettingsSection = styled.div`
  h1 {
    color: ${({ theme }) => theme.headerText};
    font-size: 30px;
    font-family: ${({ theme }) => theme.fonts};
    font-weight: 800;
    font-size: 30px;
    line-height: 36px;
    display: flex;
    align-items: center;
    position: relative;
    top: 5%;
    bottom: 80.47%;
  }
  h3 {
    color: ${({ theme }) => theme.text};
    font-family: ${({ theme }) => theme.fonts};
    position: relative;
    top: 27.89%;
    bottom: 69.44%;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
  }
`

function Settings() {
  return (
    <SettingsSection>
      <h1>Settings</h1>
      <h3 id="language">Configure Language</h3>
      <StyledSelect options={options} />
      <h3 id="share">Share your custom clock</h3>
      <Input
        type="text"
        placeholder="https://clock.climateclock.world/oGpVDQKb95lh"
        font-size="12px"
        line-height="25px"
        width="350px"
        height="31px"
      />
      <LanguageCustomization />
    </SettingsSection>
  )
}

export default Settings
