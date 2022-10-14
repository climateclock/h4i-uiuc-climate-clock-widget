import PropTypes from 'prop-types'
import Select from 'react-select'

import { theme } from './GlobalStyle'

const customStyles = {
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? theme.navBackground : theme.background,
    color: theme.text,
    fontSize: '14px',
  }),
  control: (base, state) => ({
    ...base,
    boxShadow: state.isFocused ? 'grey' : 'grey',
    borderColor: 'grey',
    backgroundColor: state.isSelected ? 'grey' : 'white',
    width: '255px',
    height: '31px',
    fontSize: '14px',
  }),
  container: (base) => ({
    ...base,
    fontFamily: theme.secondaryFonts,
    width: '255px',
    marginBottom: '31px',
    height: '31px',
  }),
}

export const StyledSelect = ({
  options,
  optionSelected,
  handleOptionSelectedChange,
}) => (
  <Select
    styles={customStyles}
    value={optionSelected}
    onChange={handleOptionSelectedChange}
    options={options}
    theme={(theme) => ({
      ...theme,
      border: '1px solid #A3A3A3',
      colors: {
        ...theme.colors,
        primary25: 'neutral0',
      },
    })}
  />
)

StyledSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.any),
  optionSelected: PropTypes.any,
  handleOptionSelectedChange: PropTypes.func,
}
