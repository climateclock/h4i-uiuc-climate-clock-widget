import { ModuleResInterface } from '../interfaces'
import { returnFirstString } from './utils/utils'

const LifelineCard = ({ labels }: ModuleResInterface) => {
  return (
    <div>
      <h1>{returnFirstString(labels)}</h1>
      <p>{returnFirstString(labels)}</p>
    </div>
  )
}

export default LifelineCard
