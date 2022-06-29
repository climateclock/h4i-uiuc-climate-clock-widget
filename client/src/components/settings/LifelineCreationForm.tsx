import { useEffect, useState } from 'react'
import { useFullScreenHandle } from 'react-full-screen'
import styled from 'styled-components'

import { ModuleResInterface } from '../../interfaces'
import {
  ERROR_MSG,
  LIFELINES_LOCAL_STORAGE_KEY,
  URL,
} from '../../utils/constants'
import { getData } from '../../utils/utils'
import DraggableLifelines from '../draggable/DraggableLifelines'
import CreateModal from '../modals/CreateModal'
import NavBar from '../ui/NavBar'
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
export interface LifelineInterface {
  title: string
  statistic: number | null
  unit: string
  rate: number
  source: string
  link: string
}

const LifelineCreationForm = () => {
  /* Lifeline module properties */
  const handle = useFullScreenHandle()
  const flavor = 'Lifeline'
  // const [title, setTitle] = useState<string>('')
  // const [unit, setUnit] = useState<string>('')
  // const [value, setValue] = useState<number>(0)
  // const [rate, setRate] = useState<number>(0)
  // const [resolution, setResolution] = useState<number>(2)
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
  // const clearProperties = () => {
  //   setTitle('')
  //   setUnit('')
  //   setValue(0)
  //   setRate(0)
  //   setResolution(0)
  // }

  /* formSubmit
   *
   * Description: Used to append a Lifeline module to current list of modules.
   */
  const formSubmit = (Lifeline: LifelineInterface) => {
    const llModule: ModuleResInterface = {
      labels: [
        Lifeline.title.toUpperCase(),
      ] /* stored as array in API response */,
      flavor,
      initial: Lifeline.statistic ?? 0,
      unit_labels: [
        Lifeline.unit.toUpperCase(),
      ] /* stored as array in API response */,
      rate: Lifeline.rate,
      resolution: Math.pow(10, -2) /* ie. resolution of 2 => 0.01 */,
      customizable: true,
    }
    lifelineModules.push(llModule)
    setLifelineModules([...lifelineModules])
    localStorage.setItem(
      LIFELINES_LOCAL_STORAGE_KEY,
      JSON.stringify(lifelineModules),
    )
    // clearProperties()
  }
  return (
    <>
      <NavBar handle={handle} isFullScreen={true} atHome={false}></NavBar>
      <FormatSpacing>
        <StyledLifeline>
          <h1>Clock Lifelines</h1>
          <DefaultLifelineCreationForm
            lifelineModules={lifelineModules}
            setLifelineModules={setLifelineModules}
          />
          <CreateModal formSubmit={formSubmit} />
          <h3>Displayed Lifelines</h3>
          <p>
            Drag a Lifeline here to display it. Up to three Lifelines can be
            shown on the clock.
          </p>

          <DraggableLifelines lifelinesProp={lifelineModules} />
          {/* <DraggableLifelines lifelinesProp={lifelineModules} /> */}
          <h3>Hidden Lifelines</h3>
        </StyledLifeline>
      </FormatSpacing>
    </>
  )
}

export default LifelineCreationForm
