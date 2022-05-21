import { PencilFill } from '@styled-icons/bootstrap'
import { ModuleResInterface } from '../interfaces'
import { returnFirstString } from '../utils/utils'
import { LifelineDropdown } from './lifelines/Dropdown'

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
      <div
        style={{
          fontSize: '0.8em',
          textAlign: 'center',
          alignSelf: 'center',
          gridColumn: 3,
        }}
      >
        <LifelineDropdown isDisplayed={isDisplayed} isCustomizable={customizable} />
      </div>
    </div>
  )
}

export default LifelineCard
