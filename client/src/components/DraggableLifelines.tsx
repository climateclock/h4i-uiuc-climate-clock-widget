import { CSSProperties } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd'
import { ModuleResInterface } from '../interfaces'
import { LIFELINES_LOCAL_STORAGE_KEY } from '../util/constants'
import LifelineCard from './LifelineCard'
import { reorderElement } from './utils/utils'

interface DraggableLifelinesInterface {
  lifelines: ModuleResInterface[]
}

const DraggableLifelines = ({ lifelines }: DraggableLifelinesInterface) => {
  const BASE_PADDING = 8

  const getDraggableItemStyle = (
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
  ): CSSProperties => ({
    height: '10vh',
    backgroundColor: 'darkgrey',
    padding: BASE_PADDING * 2,
    margin: `0 0 ${BASE_PADDING}px 0`,
    ...draggableStyle,
  })

  const getDroppableStyle = () => ({
    padding: BASE_PADDING,
    backgroundColor: 'lightgrey',
    border: 'black 2px solid',
    margin: '0 auto',
    width: '95vw',
    height: '75vh',
  })

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }
    reorderElement(lifelines, result.source.index, result.destination.index)
    localStorage.setItem(LIFELINES_LOCAL_STORAGE_KEY, JSON.stringify(lifelines))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppableId">
        {(provided, _) => (
          <div
            style={getDroppableStyle()}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {lifelines.map((lifeline, index) => (
              <Draggable
                key={index}
                draggableId={index.toString()}
                index={index}
              >
                {(provided, _) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getDraggableItemStyle(provided.draggableProps.style)}
                  >
                    <LifelineCard {...lifeline} />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DraggableLifelines
