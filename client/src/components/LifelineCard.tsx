import { ModuleResInterface } from '../interfaces'
import { returnFirstString } from './utils/utils'
import { TrashAlt } from '@styled-icons/boxicons-solid'

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
}: LifelineCardInterface) => {
  // const TRASH_ICON_SIZE = '25'
  return (
    <div style={{ width: '90vw' }}>
      <p>{returnFirstString(labels)}</p>
      {/*
      {customizable && (
        <TrashAlt
          size={TRASH_ICON_SIZE}
          onClick={() => deleteLifeline(index)}
        />
      )}
        */}
    </div>
  )
}

export default LifelineCard
