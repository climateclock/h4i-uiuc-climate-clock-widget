import { compressToEncodedURIComponent } from 'lz-string'
import { useEffect, useState } from 'react'
import { useFullScreenHandle } from 'react-full-screen'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { ModuleResInterface } from '../../interfaces'
import { UpdateSettings } from '../../routing/UpdateSettings'
import { UpdateURL } from '../../routing/UpdateURL'
import {
  COMPRESSED_KEY,
  ERROR_MSG,
  LANGUAGE_LOCAL_STORAGE_KEY,
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
const StyledCreationLifelinesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 50%;
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
  }, [lifelineModules])

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
  }
  return (
    <>
      <NavBar handle={handle} isFullScreen={true} atHome={false}></NavBar>
      <FormatSpacing>
        <StyledLifeline>
          <h1>Clock Lifelines</h1>
          <StyledCreationLifelinesContainer>
            <DefaultLifelineCreationForm
              lifelineModules={lifelineModules}
              setLifelineModules={setLifelineModules}
            />
            <CreateModal formSubmit={formSubmit} />
          </StyledCreationLifelinesContainer>
          <h3>Displayed Lifelines</h3>
          <p>
            Drag a Lifeline here to display it. Up to three Lifelines can be
            shown on the clock.
          </p>

          <DraggableLifelines lifelinesProp={lifelineModules} />
          <h3>Hidden Lifelines</h3>
        </StyledLifeline>
      </FormatSpacing>
    </>
  )
}

export default LifelineCreationForm
