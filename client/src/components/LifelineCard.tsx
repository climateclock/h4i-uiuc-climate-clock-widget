import { ModuleResInterface } from '../interfaces'
import { returnFirstString } from './utils/utils'

interface LifelineCardInterface {
  lifeline: ModuleResInterface
  index: number
  deleteLifeline: (index: number) => void
  isDisplayed: boolean
}

const LifelineCard = ({
  lifeline: { labels, customizable },
  index,
  deleteLifeline,
}: // isDisplayed,
LifelineCardInterface) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <p>{returnFirstString(labels)}</p>
      {customizable && (
        <button onClick={() => deleteLifeline(index)}>Delete</button>
      )}
    </div>
  )
}

export default LifelineCard
