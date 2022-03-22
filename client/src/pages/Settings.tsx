import Select from 'react-select'
import styled from 'styled-components'

const Input = styled.input`
  font-size: 12px;
  line-height: 25px;
  width: 350px;
  height: 31px;
  top: 3px;
  left: 9px;
`
const options = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'mandarin', label: 'Mandarin' },
]
const SettingsSection = styled.div`
  left: 2.29%;
  right: 22.01%;
  top: 5%;
  bottom: 80.47%;
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

const customStyles = {
  control: (base, state) => ({
    ...base,
    boxShadow: state.isFocused ? 'grey' : 'grey',
    borderColor: 'grey',
    backgroundColor: 'white',
    color: state.isFocused ? 'white' : 'white',
    width: '255px',
    height: '31px',
  }),
}

function Settings() {
  return (
    <SettingsSection>
      <h1>Settings</h1>
      <h3 id="language">Configure Language</h3>
      <Select
        styles={customStyles}
        options={options}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: 'neutral0',
          },
        })}
      />
      <h3 id="share">Share your custom clock</h3>
      <Input
        type="text"
        placeholder="https://clock.climateclock.world/oGpVDQKb95lh"
      />
    </SettingsSection>
  )
}

export default Settings
