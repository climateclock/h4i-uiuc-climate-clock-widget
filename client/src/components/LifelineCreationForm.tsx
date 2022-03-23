import { useState } from 'react'
import { LIFELINES_LOCAL_STORAGE_KEY } from '../util/constants'
import { ModuleResInterface } from '../interfaces'

const LifelineCreationForm = () => {
  /* Lifeline module properties */
  const flavor = 'Lifeline'
  const [title, setTitle] = useState<string>('')
  const [unit, setUnit] = useState<string>('')
  const [value, setValue] = useState<number>(0)
  const [rate, setRate] = useState<number>(0)
  const [resolution, setResolution] = useState<number>(2)

  /* formSubmit
   *
   * Description: Used to append a Lifeline module to current list of modules.
   */
  const formSubmit = (e: any) => {
    e.preventDefault()
    const llModule: ModuleResInterface = {
      labels: [title] /* stored as array in API response */,
      flavor,
      initial: value,
      unit_labels: [unit] /* stored as array in API response */,
      rate,
      resolution: Math.pow(10, -resolution) /* ie. resolution of 2 => 0.01 */,
    }
    const ll = localStorage.getItem(LIFELINES_LOCAL_STORAGE_KEY)
    /* ensure lifelineModules and setLifelineModules are not undefined */
    if (ll) {
      let modules = JSON.parse(ll)
      modules.push(llModule)
      localStorage.setItem(LIFELINES_LOCAL_STORAGE_KEY, JSON.stringify(modules))
    }
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
    </>
  )
}

export default LifelineCreationForm
