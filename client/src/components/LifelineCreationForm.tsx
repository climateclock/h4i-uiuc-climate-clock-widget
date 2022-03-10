import { useState, useContext } from 'react'
import { ThemeContext } from '../contexts'
import { ModuleResInterface } from '../interfaces'

const LifelineCreationForm = () => {
  /* Lifeline module properties */
  const flavor = 'Lifeline'
  const [title, setTitle] = useState<string>('')
  const [unit, setUnit] = useState<string>('')
  const [value, setValue] = useState<number>(0)
  const [rate, setRate] = useState<number>(0)
  const [resolution, setResolution] = useState<number>(0)
  const { lifelineModules, setLifelineModules } = useContext(ThemeContext)

  /* formSubmit
   *
   * Description: Used to append a Lifeline module to current list of modules.
   */
  const formSubmit = (e: any) => {
    e.preventDefault()
    const llModule: ModuleResInterface = {
      labels: [title] /* stored as array in API */,
      flavor,
      initial: value,
      unit_labels: [unit] /* stored as array in API */,
      rate,
      resolution: Math.pow(10, -resolution) /* ie. resolution of 2 => 0.01 */,
    }
    /* ensure lifelineModules and setLifelineModules are not undefined */
    if (lifelineModules && setLifelineModules) {
      lifelineModules.push(llModule)
      /* create new instance of lifelineModules array to re-render page */
      setLifelineModules([...lifelineModules])
    }
  }

  return (
    <>
      <h1>{flavor} form</h1>
      <form onSubmit={formSubmit}>
        {/* title input */}
        <label>Title</label>
        <input
          type={'text'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        {/* unit input */}
        <label>Unit</label>
        <input
          type={'text'}
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
        <br />

        {/* value input */}
        <label>Value</label>
        <input
          type={'number'}
          value={value}
          onChange={(e) =>
            setValue(e.target.value !== '' ? parseFloat(e.target.value) : 0)
          }
        />
        <br />

        {/* rate input */}
        <label>Rate</label>
        <input
          type={'number'}
          value={rate}
          onChange={(e) =>
            setRate(e.target.value !== '' ? parseFloat(e.target.value) : 0)
          }
        />
        <br />

        {/* resolution input */}
        <label>Resolution</label>
        <input
          type={'number'}
          value={resolution}
          onChange={(e) =>
            setResolution(
              parseInt(e.target.value) >= 0 ? parseFloat(e.target.value) : 0,
            )
          }
        />
        <br />

        <button type="submit">Create</button>
      </form>
    </>
  )
}

export default LifelineCreationForm
