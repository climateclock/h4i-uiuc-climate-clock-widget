import { useEffect, useState } from 'react'
import {
  URL,
  ERROR_MSG,
  LIFELINES_LOCAL_STORAGE_KEY,
  LANGUAGE_LOCAL_STORAGE_KEY,
  COMPRESSED_KEY,
} from '../../utils/constants'
import { compressToEncodedURIComponent } from 'lz-string'
import { useNavigate } from 'react-router-dom'
import { ModuleResInterface } from '../../interfaces'
import { getData } from '../../utils/utils'
import DraggableLifelines from '../DraggableLifelines'
import { UpdateURL } from '../../routing/UpdateURL'
import { UpdateSettings } from '../../routing/UpdateSettings'
const LifelineCreationForm = () => {
  /* Lifeline module properties */
  const flavor = 'Lifeline'
  const [title, setTitle] = useState<string>('')
  const [unit, setUnit] = useState<string>('')
  const [value, setValue] = useState<number>(0)
  const [rate, setRate] = useState<number>(0)
  const [resolution, setResolution] = useState<number>(2)
  const [, setModules] = useState<ModuleResInterface[]>([])
  const [, setErrorFlag] = useState<boolean>(false)
  const [, setDefaultLanguage] = useState<string>('')
  const [lifelineModules, setLifelineModules] = useState<ModuleResInterface[]>(
    [],
  )
  const navigate = useNavigate()

  useEffect(() => {
    getData(
      URL,
      ERROR_MSG,
      setErrorFlag,
      setDefaultLanguage,
      setModules,
      setLifelineModules,
    )
    UpdateURL(navigate)
    UpdateSettings(null, lifelineModules)
  }, [navigate, lifelineModules])

  /* clearProperties
   *
   * Description: Clear form fields for creation form
   */
  const clearProperties = () => {
    setTitle('')
    setUnit('')
    setValue(0)
    setRate(0)
    setResolution(0)
  }

  /* formSubmit
   *
   * Description: Used to append a Lifeline module to current list of modules.
   */
  const formSubmit = (e: any) => {
    e.preventDefault()
    /*const language: string | null = localStorage.getItem(
      LANGUAGE_LOCAL_STORAGE_KEY,
    )*/
    let json = {
      language: localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY),
      lifelines: lifelineModules,
    }
    const settings_json = JSON.stringify(json)
    let compressed = compressToEncodedURIComponent(settings_json)
    navigate(`${compressed}`)
    localStorage.setItem(COMPRESSED_KEY, compressed)

    const llModule: ModuleResInterface = {
      labels: [title] /* stored as array in API response */,
      flavor,
      initial: value,
      unit_labels: [unit] /* stored as array in API response */,
      rate,
      resolution: Math.pow(10, -resolution) /* ie. resolution of 2 => 0.01 */,
      customizable: true,
    }
    lifelineModules.push(llModule)
    setLifelineModules([...lifelineModules])
    localStorage.setItem(
      LIFELINES_LOCAL_STORAGE_KEY,
      JSON.stringify(lifelineModules),
    )
    clearProperties()
  }

  return (
    <>
      <h1>{flavor} form</h1>
      <form onSubmit={formSubmit}>
        {/* title input */}
        <label>Title</label>
        <input
          required={true}
          placeholder={'Title...'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        {/* unit input */}
        <label>Unit</label>
        <input
          required={true}
          placeholder={'Unit...'}
          type={'text'}
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
        <br />

        {/* value input */}
        <label>Value</label>
        <input
          required={true}
          placeholder={'Value...'}
          type={'number'}
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value))}
        />
        <br />

        {/* rate input */}
        <label>Rate</label>
        <input
          type={'number'}
          placeholder={'Rate...'}
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
        />
        <br />

        {/* resolution input */}
        <label>Resolution</label>
        <input
          min={0} /* enforces resolution is positive */
          type={'number'}
          placeholder={'Resolution...'}
          value={resolution}
          onChange={(e) => setResolution(parseInt(e.target.value))}
        />
        <br />

        <button type="submit">Create</button>
      </form>
      <DraggableLifelines lifelinesProp={lifelineModules} />
    </>
  )
}

export default LifelineCreationForm
