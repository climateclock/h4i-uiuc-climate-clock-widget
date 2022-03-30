import Select from 'react-select'

export const StyledSelect = ({ customStyles, options }) => (
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
