import { useState, useEffect } from 'react'
import { get } from '../../api/config'
import { ModuleResInterface, OptionsInterface } from '../../interfaces'
import {
  URL,
  DEFAULT_LIFELINES_LOCAL_STORAGE_KEY,
  ERROR_MSG,
  LIFELINES_LOCAL_STORAGE_KEY,
} from '../../utils/constants'
import { getData, returnFirstString } from '../../utils/utils'
import { StyledSelect } from '../ui/Select'

const DefaultLifelineCreationForm = () => {
  const [optionSelected, setOptionSelected] = useState<OptionsInterface>()
  const [defaultOptions, setDefaultOptions] = useState<OptionsInterface[]>([])
  const [, setDefaultLifelines] = useState<ModuleResInterface[]>([])
  // think about the case when defaults have not been pulled yet
  useEffect(() => {
    let defaultLifelines: string | null = localStorage.getItem(
      DEFAULT_LIFELINES_LOCAL_STORAGE_KEY,
    )
    if (defaultLifelines) {
      let options: OptionsInterface[] = []
      let cleanedDefaultLifelines: ModuleResInterface[] =
        JSON.parse(defaultLifelines)

      setDefaultLifelines(cleanedDefaultLifelines)
      for (let i = 0; i < cleanedDefaultLifelines.length; i++) {
        let defaultLifeline = cleanedDefaultLifelines[i]
        options.push({
          value: defaultLifeline,
          label: returnFirstString(defaultLifeline['labels']),
        })
      }

      setDefaultOptions(options)
    }
  }, [])

  const handleOptionSelectedChange = (option) => {
    setOptionSelected(option)
  }
  const [lifelineModules, setLifelineModules] = useState<ModuleResInterface[]>(
    [],
  )

  useEffect(() => {
    const getData = async () => {
      let res: any = await get(URL, ERROR_MSG)

      if ('error' in res) {
        return
      }

      /* set modules */
      let resModules: ModuleResInterface[] = Object.values(
        res['data']['data']['modules'],
      )

      /* set lifelines */
      if (!localStorage.getItem(LIFELINES_LOCAL_STORAGE_KEY)) {
        let resLifelineModules = resModules.filter((module) => {
          if (module['type'] === 'value' && module['flavor'] === 'lifeline') {
            return true
          }
          return false
        })
        setLifelineModules(resLifelineModules)

        /* stores lifeline modules in local storage */
        localStorage.setItem(
          LIFELINES_LOCAL_STORAGE_KEY,
          JSON.stringify(resLifelineModules),
        )
      } else {
        const curLifelineModules = localStorage.getItem(
          LIFELINES_LOCAL_STORAGE_KEY,
        )
        if (curLifelineModules)
          setLifelineModules(JSON.parse(curLifelineModules))
      }
    }

    getData()
  }, [])

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
      if (hasLifeline(optionSelected.value)) {
        return
      }

      let lifelineSelected: ModuleResInterface = optionSelected.value

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
