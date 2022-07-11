import useWindowDimensions from '../../hooks/useWindowdimensions'
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
  const dimensions = useWindowDimensions()

  const lifelineDisplayNum = dimensions.height > 700 ? displayNum : 1
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
            lifelineCount={lifeLineData.length}
          />
        )
      })}
    </>
  )
}
