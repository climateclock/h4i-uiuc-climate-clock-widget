import { TrashAlt } from '@styled-icons/boxicons-solid'
import { CSSProperties, useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle,
} from 'react-beautiful-dnd'

import { ModuleResInterface } from '../interfaces'
import {
  LIFELINES_LOCAL_STORAGE_KEY,
  NUM_LIFELINES_DISPLAYED,
} from '../utils/constants'
import { deleteElement, reorderElement } from '../utils/utils'
import LifelineCard from './LifelineCard'

interface DraggableLifelinesInterface {
  lifelinesProp: ModuleResInterface[]
}

const DraggableLifelines = ({ lifelinesProp }: DraggableLifelinesInterface) => {
  const BASE_PADDING = 4
  const [lifelines, setLifelines] = useState<ModuleResInterface[]>([])

  /* fill lifelines with passed in props for rendering */
  useEffect(() => {
    setLifelines(lifelinesProp)
  }, [lifelinesProp])

  const deleteLifeline = (index: number) => {
    const modifiedLifelines: ModuleResInterface[] = deleteElement(
      lifelines,
      index,
    )
    setLifelines([...modifiedLifelines])
    localStorage.setItem(LIFELINES_LOCAL_STORAGE_KEY, JSON.stringify(lifelines))
  }

  const getDraggableItemStyle = (
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
  ): CSSProperties => ({
    padding: BASE_PADDING * 2,
    margin: `0 0 ${BASE_PADDING}px 0`,
    alignItems: 'center',
    display: 'grid',
    gridTemplateColumns: '2.5fr 95fr 2.5fr',

    // styles we need to apply on draggables
    ...draggableStyle,
  })

  const getDroppableStyle = () => ({
    padding: `${BASE_PADDING}px`,
    margin: '0 auto',
    width: '95vw',
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
      {/* create draggable area within page */}
      <Droppable droppableId="droppableId">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getDroppableStyle()}
          >
            {/* create draggable LifelineCard for each lifeline */}
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
                    {index < NUM_LIFELINES_DISPLAYED && (
                      <p
                        style={{
                          border: 'black 2px solid',
                          borderRadius: '5px',
                          gridColumn: 1,
                          fontSize: '0.65em',
                          justifySelf: 'center',
                          padding: '10%',
                        }}
                      >
                        {index + 1}
                      </p>
                    )}
                    <div
                      style={{
                        background: '#f1f1f1',
                        borderRadius: '10px',
                        width: '92.5%',
                        padding: '0 2%',
                        gridColumn: 2,
                      }}
                    >
                      <LifelineCard
                        lifeline={lifeline}
                        isDisplayed={index < NUM_LIFELINES_DISPLAYED}
                      />
                    </div>
                    {/* render delete button */}
                    {lifeline.customizable && (
                      <TrashAlt
                        size={'1.5em'}
                        onClick={() => deleteLifeline(index)}
                        style={{
                          gridColumn: 3,
                          cursor: 'pointer',
                        }}
                      />
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DraggableLifelines
