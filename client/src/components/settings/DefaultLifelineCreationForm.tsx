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

const DefaultLifelineCreationForm = () => {
  const [optionSelected, setOptionSelected] = useState<OptionsInterface>()
  const [defaultOptions, setDefaultOptions] = useState<OptionsInterface[]>([])
  const [, setDefaultLifelines] = useState<ModuleResInterface[]>([])
  const [lifelineModules, setLifelineModules] = useState<ModuleResInterface[]>(
    [],
  )

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
        for (let i = 0; i < cleanedDefaultLifelines.length; i++) {
          const defaultLifeline = cleanedDefaultLifelines[i]
          options.push({
            value: defaultLifeline,
            label: returnFirstString(defaultLifeline['labels']),
          })
        }

        setDefaultOptions(options)
      }
    }

    const data = async () => {
      await getLifelineModules(URL, ERROR_MSG, setLifelineModules)
    }

    data().then(() => {
      setDefaults()
    })
  }, [])

  const handleOptionSelectedChange = (option: OptionsInterface | undefined) => {
    setOptionSelected(option)
  }

  const hasLifeline = (newLifeline: ModuleResInterface) => {
    for (let i = 0; i < lifelineModules.length; i++) {
      if (JSON.stringify(lifelineModules[i]) === JSON.stringify(newLifeline))
        return true
    }
    return false
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (optionSelected && optionSelected.value) {
      if (hasLifeline(optionSelected.value)) return

      const lifelineSelected: ModuleResInterface = optionSelected.value

      lifelineModules.push(lifelineSelected)
      setLifelineModules([...lifelineModules])
      localStorage.setItem(
        LIFELINES_LOCAL_STORAGE_KEY,
        JSON.stringify(lifelineModules),
      )
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <StyledSelect
        options={defaultOptions}
        optionSelected={optionSelected}
        handleOptionSelectedChange={handleOptionSelectedChange}
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default DefaultLifelineCreationForm
