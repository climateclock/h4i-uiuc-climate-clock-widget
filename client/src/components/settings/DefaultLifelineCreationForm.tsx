import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

import { ModuleResInterface, OptionsInterface } from '../../interfaces'
import {
  DEFAULT_LIFELINES_LOCAL_STORAGE_KEY,
  ERROR_MSG,
  LIFELINES_LOCAL_STORAGE_KEY,
  URL,
} from '../../utils/constants'
import { getLifelineModules, returnFirstString } from '../../utils/utils'
import { StyledSelect } from '../ui/Select'

export default function DefaultLifelineCreationForm({
  lifelineModules,
  setLifelineModules,
}) {
  const [optionSelected, setOptionSelected] = useState<OptionsInterface>()
  const [defaultOptions, setDefaultOptions] = useState<OptionsInterface[]>([])
  const [, setDefaultLifelines] = useState<ModuleResInterface[]>([])

  useEffect(() => {
    const setDefaults = () => {
      const defaultLifelines: string | null = localStorage.getItem(
        DEFAULT_LIFELINES_LOCAL_STORAGE_KEY,
      )
      if (defaultLifelines) {
        const options: OptionsInterface[] = []
        const cleanedDefaultLifelines: ModuleResInterface[] =
          JSON.parse(defaultLifelines)

        setDefaultLifelines(cleanedDefaultLifelines)
        cleanedDefaultLifelines.forEach((defaultLifeline) => {
          options.push({
            value: defaultLifeline,
            label: returnFirstString(defaultLifeline['labels']),
          })
        })

        setDefaultOptions(options)
      }
    }

    const data = async () => {
      await getLifelineModules(URL, ERROR_MSG, setLifelineModules)
    }

    data().then(() => {
      setDefaults()
    })
  }, [setLifelineModules])

  useEffect(() => {
    const hasLifeline = (newLifeline: ModuleResInterface) => {
      for (let i = 0; i < lifelineModules.length; i++) {
        if (JSON.stringify(lifelineModules[i]) === JSON.stringify(newLifeline))
          return true
      }
      return false
    }
    if (optionSelected && optionSelected.value) {
      if (hasLifeline(optionSelected.value)) return

      const lifelineSelected: ModuleResInterface = optionSelected.value
      const newLifelineModules = lifelineModules

      newLifelineModules.push(lifelineSelected)
      setLifelineModules(newLifelineModules)
      localStorage.setItem(
        LIFELINES_LOCAL_STORAGE_KEY,
        JSON.stringify(newLifelineModules),
      )
    }
  }, [lifelineModules, optionSelected, setLifelineModules])
  const handleOptionSelectedChange = (option: OptionsInterface | undefined) => {
    setOptionSelected(option)
  }

  return (
    <StyledSelect
      options={defaultOptions}
      optionSelected={optionSelected}
      handleOptionSelectedChange={handleOptionSelectedChange}
    />
  )
}

DefaultLifelineCreationForm.propTypes = {
  lifelineModules: PropTypes.arrayOf(PropTypes.any),
  setLifelineModules: PropTypes.func,
}

// export default DefaultLifelineCreationForm
