import Select, { ActionMeta, SingleValue } from 'react-select'

import { optionProps } from '../../interfaces'
import { Option } from '../utils/constants'

const customStyles = {
  control: (base, state) => ({
    ...base,
    boxShadow: state.isFocused ? 'grey' : 'grey',
    borderColor: 'grey',
    backgroundColor: 'white',
    color: state.isFocused ? 'white' : 'white',
    width: '255px',
    height: '31px',
    left: '5%',
  }),
  container: (base) => ({
    ...base,
    width: '255px',
    height: '31px',
    left: '4%',
  }),
}

export const StyledSelect = ({
  options,
  onChange,
  value,
}: {
  options: optionProps[]
  onChange?: (
    newValue: SingleValue<optionProps>,
    actionMeta: ActionMeta<optionProps>,
  ) => void
  value?: Option
}) => (
  <Select
    styles={customStyles}
    options={options}
    onChange={onChange}
    value={value}
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
