import { useState, useContext } from 'react'
import { ThemeContext } from '../contexts'
import { ModuleResInterface } from '../interfaces'

const LifelineCreationForm = () => {
  const flavor = 'Lifeline'
  const [title, setTitle] = useState<string>('')
  const [unit, setUnit] = useState<string>('')
  const [value, setValue] = useState<number>(0)
  const [rate, setRate] = useState<number>(0)
  const [resolution, setResolution] = useState<number>(0)
  const { lifelineModules, setLifelineModules } = useContext(ThemeContext)

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
    /* ensure not undefined */
    if (lifelineModules && setLifelineModules) {
      lifelineModules.push(llModule)
      setLifelineModules([...lifelineModules])
    }
  }

  return (
    <>
      <h1>{flavor} form</h1>
      <form onSubmit={formSubmit}>
        <label>Title</label>
        <input
          type={'text'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>Unit</label>
        <input
          type={'text'}
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
        <br />
        <label>Value</label>
        <input
          type={'number'}
          value={value}
          onChange={(e) =>
            setValue(e.target.value !== '' ? parseFloat(e.target.value) : 0)
          }
        />
        <br />
        <label>Rate</label>
        <input
          type={'number'}
          value={rate}
          onChange={(e) =>
            setRate(e.target.value !== '' ? parseFloat(e.target.value) : 0)
          }
        />
        <br />
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
