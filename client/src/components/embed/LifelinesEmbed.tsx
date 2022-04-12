/*
 * Note:
 *  LifelinesEmbed component modified off of Lifelines.tsx
 *  in '../lifelines/Lifelines.tsx'
 *      - has functionality to switch between up to number of
 *          lifelines allowed to be displayed (currently 3)
 *
 */

import Lifeline from '../lifelines/Lifeline'
import { ModuleResInterface } from '../../interfaces'
import { returnFirstString, toUpperCase } from '../../utils/utils'
import useWindowDimensions from '../../hooks/useWindowdimensions'
import { useEffect, useState } from 'react'

interface LifelinePropsInterface {
  lifeLineData: ModuleResInterface[]
  displayNum: number
}

export default function LifelinesEmbed({
  lifeLineData,
  displayNum,
}: LifelinePropsInterface) {
  const dimensions = useWindowDimensions()
  let lifelineDisplayNum = dimensions.height > 700 ? displayNum : 1
  const [lifelineIndex, setLifelineIndex] = useState<number>(0)
  const LIFELINE_DURATION = 5 // seconds displayed per lifeline
  //   const [lifelineSavedValues, setLifelineSavedValues] = useState<
  //     number[] | undefined[]
  //   >(Array(lifelineDisplayNum))

  //   useEffect(() => {
  //     for (let i = 0; i < displayNum; i++) {
  //         lifelineSavedValues[i] = lifeLineData[i]['initial']
  //     }
  //     setLifelineIndex([])
  //   },[])

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

  return (
    <>
      {lifeLineData.slice(lifelineIndex, lifelineIndex + 1).map((module) => {
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
