import Select from 'react-select'

import { optionProps } from '../../interfaces'

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
  container: (base) => ({
    ...base,
    width: '255px',
    height: '31px',
  }),
}

export const StyledSelect = ({ options }: { options: optionProps[] }) => (
  <Select
    styles={customStyles}
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
