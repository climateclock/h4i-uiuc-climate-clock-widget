import { PencilFill } from '@styled-icons/bootstrap'
import { ModuleResInterface } from '../interfaces'
import { returnFirstString } from '../utils/utils'

interface LifelineCardInterface {
  lifeline: ModuleResInterface
  isDisplayed: boolean
}

const LifelineCard = ({
  lifeline: { labels, customizable },
  isDisplayed,
}: LifelineCardInterface) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '15fr 1fr 1fr',
        gridGap: '5px',
      }}
    >
      <h1 style={{ gridColumn: 1 }}>{returnFirstString(labels)}</h1>
      <p
        style={{
          fontSize: '0.8em',
          border: '1px black solid',
          padding: '5px 7.5px',
          borderRadius: '5px',
          textAlign: 'center',
          alignSelf: 'center',
          gridColumn: 2,
        }}
      >
        {isDisplayed ? 'Hide' : 'Show'}
      </p>
      {customizable && (
        <PencilFill
          size={'1.5em'}
          style={{
            justifySelf: 'center',
            cursor: 'pointer',
            alignSelf: 'center',
            gridColumn: 3,
          }}
        />
      )}
    </div>
  )
}

export default LifelineCard
