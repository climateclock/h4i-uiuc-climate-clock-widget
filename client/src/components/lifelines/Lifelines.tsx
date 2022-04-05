import Lifeline from './Lifeline'
import { ModuleResInterface } from '../../interfaces'
import { returnFirstString, toUpperCase } from '../../utils/utils'
import useWindowDimensions from '../../hooks/useWindowdimensions'
import { useState } from 'react'

interface LifelinePropsInterface {
  lifeLineData: ModuleResInterface[]
  error: boolean
  displayNum: number
}

export default function Lifelines(props: any) {
  const dimensions = useWindowDimensions()

  let lifelineDisplayNum = dimensions.height > 700 ? props.displayNum : 1
  return (
    <>
      {props.lifeLineData.slice(0, lifelineDisplayNum).map((module) => {
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
