import { ModuleResInterface } from '../interfaces'
import { returnFirstString } from './utils/utils'

interface LifelineCardInterface {
  lifeline: ModuleResInterface
}

const LifelineCard = ({ lifeline: { labels } }: LifelineCardInterface) => {
  return (
    <div style={{ display: 'flex' }}>
      <h1>{returnFirstString(labels)}</h1>
    </div>
  )
}

export default LifelineCard
