import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ModuleResInterface } from '../../interfaces'
import {
  ERROR_MSG,
  LIFELINES_LOCAL_STORAGE_KEY,
  URL,
} from '../../utils/constants'
import { getData } from '../../utils/utils'
import DraggableLifelines from '../draggable/DraggableLifelines'
import Input from '../ui/Input'
import DefaultLifelineCreationForm from './DefaultLifelineCreationForm'

const StyledLifeline = styled.div`
  font-family: ${({ theme }) => theme.secondaryFonts};
  h1 {
    color: ${({ theme }) => theme.headerText};
    font-weight: 700;
    line-height: 36px;
    font-size: 30px;
  }
  h3 {
    color: ${({ theme }) => theme.text};
    font-weight: 500;
    line-height: 22px;
    font-size: 18px;
  }
  p {
    color: ${({ theme }) => theme.text};
    font-weight: 400;
    line-height: 17px;
    font-size: 14px;
  }
`
const FormatSpacing = styled.div`
  max-width: 1090px;
  margin: 57px;
`

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

  useEffect(() => {
    getData(
      URL,
      ERROR_MSG,
      setErrorFlag,
      setDefaultLanguage,
      setModules,
      setLifelineModules,
    )
  }, [lifelineModules])

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
  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const llModule: ModuleResInterface = {
      labels: [title.toUpperCase()] /* stored as array in API response */,
      flavor,
      initial: value,
      unit_labels: [unit.toUpperCase()] /* stored as array in API response */,
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
      <FormatSpacing>
        <StyledLifeline>
          <h1>Clock Lifelines</h1>
          <form onSubmit={formSubmit}>
            {/* title input */}
            <label>Title</label>
            <Input
              required={true}
              placeholder={'Title...'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />

            {/* unit input */}
            <label>Unit</label>
            <Input
              required={true}
              placeholder={'Unit...'}
              type={'text'}
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
            <br />

            {/* value input */}
            <label>Value</label>
            <Input
              required={true}
              placeholder={'Value...'}
              type={'number'}
              value={value}
              onChange={(e) => setValue(parseFloat(e.target.value))}
            />
            <br />

            {/* rate input */}
            <label>Rate</label>
            <Input
              type={'number'}
              placeholder={'Rate...'}
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
            />
            <br />

            {/* resolution input */}
            <label>Resolution</label>
            <Input
              min={0} /* enforces resolution is positive */
              type={'number'}
              placeholder={'Resolution...'}
              value={resolution}
              onChange={(e) => setResolution(parseInt(e.target.value))}
            />
            <br />

            <button type="submit">Create</button>
          </form>
          <h3>Displayed Lifelines</h3>
          <p>
            Drag a Lifeline here to display it. Up to three Lifelines can be
            shown on the clock.
          </p>

          {/* <button type="submit">Create</button>
      </form> */}
          <DefaultLifelineCreationForm
            lifelineModules={lifelineModules}
            setLifelineModules={setLifelineModules}
          />
          <DraggableLifelines lifelinesProp={lifelineModules} />
          {/* <DraggableLifelines lifelinesProp={lifelineModules} /> */}
          <h3>Hidden Lifelines</h3>
        </StyledLifeline>
      </FormatSpacing>
    </>
  )
}

export default LifelineCreationForm
