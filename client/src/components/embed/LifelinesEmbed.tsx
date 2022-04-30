/*
 * Note:
 *  LifelinesEmbed component modified off of Lifelines.tsx
 *  in '../lifelines/Lifelines.tsx'
 *      - has functionality to switch between up to number of
 *          lifelines allowed to be displayed (currently 3)
 *
 */

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
  const [lifelineSavedValues, setLifelineSavedValues] = useState<number[]>(
    Array(lifelineDisplayNum).fill(0),
  ) // saved lifeline values after set time duration

  useEffect(() => {
    let interval = setInterval(() => {
      setLifelineIndex(
        (lifelineIndex) => (lifelineIndex + 1) % lifelineDisplayNum,
      )
    }, LIFELINE_DURATION * 1000)

    return () => {
      clearInterval(interval)
    }
  }, [lifelineDisplayNum])

  /* used to update saved values to continue for next time duration */
  const updateSavedValue = (index: number, value: number) => {
    let newLifelineSavedValues = lifelineSavedValues
    newLifelineSavedValues[index] = value
    setLifelineSavedValues(newLifelineSavedValues)
  }

  const returnValue = (lifelineIndex: number) => {
    if (lifelineSavedValues[lifelineIndex] > 0)
      return lifelineSavedValues[lifelineIndex]
    return lifeLineData[lifelineIndex]['initial']
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
            value={returnValue(lifelineIndex)}
            unit={returnFirstString(module['unit_labels'])}
            rate={module['rate']}
            resolution={module['resolution']}
          />
        )
      })}
    </>
  )
}
