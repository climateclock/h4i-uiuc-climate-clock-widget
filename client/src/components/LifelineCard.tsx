import { ModuleResInterface } from '../interfaces'
import { returnFirstString } from './utils/utils'

interface LifelineCardInterface {
  lifeline: ModuleResInterface
  isDisplayed: boolean
}

const LifelineCard = ({
  lifeline: { labels },
  isDisplayed,
}: LifelineCardInterface) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <h1>{returnFirstString(labels)}</h1>
      {isDisplayed && (
        <p
          style={{
            fontSize: '0.8em',
            border: '1px black solid',
            padding: '5px 7.5px',
            borderRadius: '5px',
            backgroundColor: 'white',
          }}
        >
          Shown
        </p>
      )}
    </div>
  )
}

export default LifelineCard
