import { ModuleResInterface } from '../interfaces'
import { returnFirstString } from './utils/utils'

const LifelineCard = ({ labels, customizable }: ModuleResInterface) => {
  return (
    <div>
      <p>{returnFirstString(labels)}</p>
      {customizable && <button>Delete</button>}
    </div>
  )
}

export default LifelineCard
