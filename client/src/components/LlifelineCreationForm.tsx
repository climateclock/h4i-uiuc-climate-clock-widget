import { useState, useContext } from 'react'
import { ThemeContext } from '../contexts'

const LifelineCreationForm = () => {
  const flavor = 'Lifeline'
  const [title, setTitle] = useState<string>('')
  const [unit, setUnit] = useState<string>('')
  const [val, setVal] = useState<number>(0)
  const [rate, setRate] = useState<number>(0)
  const { lifelineModules, setLifelineModules } = useContext(ThemeContext)

  return (
    <>
      <h1>{flavor} form</h1>
      <form>
        <input
          type={'text'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type={'text'}
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
        <input
          type={'number'}
          value={val}
          onChange={(e) =>
            setVal(e.target.value != '' ? parseFloat(e.target.value) : 0)
          }
        />
        <input
          type={'number'}
          value={rate}
          onChange={(e) =>
            setRate(e.target.value != '' ? parseFloat(e.target.value) : 0)
          }
        />
        <button type="submit">Create</button>
        <p>{rate}</p>
      </form>
    </>
  )
}

export default LifelineCreationForm
