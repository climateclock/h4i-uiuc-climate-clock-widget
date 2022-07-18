import { useContext } from 'react'

import { IsMobileContext } from '../../App'
import { ModuleResInterface } from '../../interfaces'
import { returnFirstString, toUpperCase } from '../../utils/utils'
import Lifeline from './Lifeline'

interface LifelinePropsInterface {
  lifeLineData: ModuleResInterface[]
  displayNum: number
}

export default function Lifelines({
  lifeLineData,
  displayNum,
}: LifelinePropsInterface) {
  const isMobile = useContext(IsMobileContext)

  const lifelineDisplayNum = isMobile ? 1 : displayNum
  return (
    <>
      {lifeLineData.slice(0, lifelineDisplayNum).map((module) => {
        return (
          <Lifeline
            key={module['description']}
            title={returnFirstString(module['labels'])}
            module_type={toUpperCase(module['flavor'])}
            value={module['initial']}
            unit={returnFirstString(module['unit_labels'])}
            rate={module['rate']}
            resolution={module['resolution']}
          />
        )
      })}
    </>
  )
}
