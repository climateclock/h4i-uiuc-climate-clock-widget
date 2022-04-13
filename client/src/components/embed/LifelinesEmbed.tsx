/*
 * Note:
 *  LifelinesEmbed component modified off of Lifelines.tsx
 *  in '../lifelines/Lifelines.tsx'
 *      - has functionality to switch between up to number of
 *          lifelines allowed to be displayed (currently 3)
 *
 */

// import Lifeline from '../lifelines/Lifeline'
import Lifeline from './LifelineEmbed'
import { ModuleResInterface } from '../../interfaces'
import { returnFirstString, toUpperCase } from '../../utils/utils'
import { useEffect, useState } from 'react'

interface LifelinePropsInterface {
  lifeLineData: ModuleResInterface[]
  displayNum: number
}

export default function LifelinesEmbed({
  lifeLineData,
  displayNum,
}: LifelinePropsInterface) {
  let lifelineDisplayNum = displayNum
  const [lifelineIndex, setLifelineIndex] = useState<number>(0)
  const LIFELINE_DURATION = 2 // seconds displayed per lifeline
  const [lifelineSavedValues, setLifelineSavedValues] = useState<
    (number | undefined)[]
  >(Array(lifelineDisplayNum)) // saved lifeline values after set time duration

  useEffect(() => {
    let interval = setInterval(() => {
      setLifelineIndex(
        (lifelineIndex) => (lifelineIndex + 1) % lifelineDisplayNum,
      )
    }, LIFELINE_DURATION * 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    for (let i = 0; i < lifelineDisplayNum; i++) {
      if (lifeLineData[i]) lifelineSavedValues[i] = lifeLineData[i]['initial']
    }
    setLifelineSavedValues([...lifelineSavedValues])
  }, [lifeLineData])

  /* used to update saved values to continue for next time duration */
  const updateSavedValue = (index: number, value: number) => {
    let newLifelineSavedValues = lifelineSavedValues
    newLifelineSavedValues[index] = value
    setLifelineSavedValues(newLifelineSavedValues)
    console.log(newLifelineSavedValues)
  }

  return (
    <>
      {lifeLineData.slice(lifelineIndex, lifelineIndex + 1).map((module) => {
        return (
          <Lifeline
            key={lifelineIndex.toString() + module['description']}
            updateSavedValue={updateSavedValue}
            lifelineIndex={lifelineIndex}
            title={returnFirstString(module['labels'])}
            module_type={toUpperCase(module['flavor'])}
            value={lifelineSavedValues[lifelineIndex]}
            unit={returnFirstString(module['unit_labels'])}
            rate={module['rate']}
            resolution={module['resolution']}
          />
        )
      })}
    </>
  )
}
