import { ModuleResInterface } from '../interfaces'
import { returnFirstString } from './utils/utils'

interface LifelineCardInterface {
  lifeline: ModuleResInterface
  isDisplayed: boolean
}

const LifelineCard = ({
  lifeline: { labels, customizable },
  isDisplayed,
}: LifelineCardInterface) => {
  return (
    <div style={{ display: 'flex' }}>
      <h1>{returnFirstString(labels)}</h1>
      {isDisplayed && <p>Displayedd</p>}
      {customizable && <button>Edit</button>}
    </div>
  )
}

export default LifelineCard
