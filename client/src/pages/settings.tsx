import LanguageCustomization from '../components/settings/LanguageCustomizationForm'
import styled from 'styled-components'

const SettingsTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts};
  font-size: 1.625rem;
  margin: 4em 0em 0em 4em;
  font-color: ${({ theme }) => theme.blue};
`

const HeadingTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts};
  font-size: 1.25rem;
  margin: 3em 0em 0em 4em;
  font-color: ${({ theme }) => theme.blue};
`

function Settings() {
  return (
    <>
      <SettingsTitle>Settings</SettingsTitle>
      <LanguageCustomization />
      <HeadingTitle>News Ticker</HeadingTitle>
      <p> Turn off/on the bottom news on your clock, </p>
    </>
  )
}

export default Settings
