import { useState, useEffect } from 'react'
import { ModuleResInterface, OptionsInterface } from '../../interfaces'
import { DEFAULT_LIFELINES_LOCAL_STORAGE_KEY } from '../../utils/constants'
import { returnFirstString } from '../../utils/utils'
import { StyledSelect } from '../ui/Select'

const DefaultLifelineCreationForm = () => {
  const [defaultOptions, setDefaultOptions] = useState<OptionsInterface[]>([])
  const [_, setDefaultLifelines] = useState<ModuleResInterface[]>([])
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

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={onSubmit}>
      <StyledSelect options={defaultOptions} />
      <button type="submit">Add</button>
    </form>
  )
}

export default DefaultLifelineCreationForm
