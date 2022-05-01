import { TrashAlt } from '@styled-icons/boxicons-solid'
import { ReOrderDotsVertical } from '@styled-icons/fluentui-system-filled/ReOrderDotsVertical'
import { CSSProperties, useEffect, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle,
} from 'react-beautiful-dnd'
import styled, { css } from 'styled-components'

import { ModuleResInterface } from '../../interfaces'
import {
  LIFELINES_LOCAL_STORAGE_KEY,
  NUM_LIFELINES_DISPLAYED,
} from '../../utils/constants'
import { deleteElement, reorderElement } from '../../utils/utils'
import LifelineCard from './LifelineCard'

interface DraggableLifelinesInterface {
  lifelinesProp: ModuleResInterface[]
}
const StyledDiv = styled.div`
  display: flex;
  background: #f1f1f1;
  border-radius: 10px;
  width: 92.5%;
  padding: 0 2% 0 1%;
  grid-column: 2;
  border: 2px lightgrey solid;
  ${(props) =>
    props.draggingOver
      ? css`
          border-color: ${({ theme }) => theme.buttonBackground};
        `
      : css`
          border-color: ${({ theme }) => theme.secondaryText};
        `}
`
const Card = styled.div`
  display: flex;
  align-self: center;
  width: 5%;
  font-size: 1.29em;
  margin-left: 0%;
`

const Alignment = styled.div`
  margin-left: 15%;
  align-self: center;
`
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
    isDraggingOver,
  ): CSSProperties => ({
    paddingBottom: BASE_PADDING * 2,
    margin: `0 0 15px 0`,
    alignItems: 'center',
    display: 'grid',
    gridTemplateColumns: '0fr 95fr 2.5fr',
    // styles we need to apply on draggables
    ...draggableStyle,
  })

  const getDroppableStyle = () => ({
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
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getDraggableItemStyle(
                      provided.draggableProps.style,
                      snapshot.draggingOver,
                    )}
                  >
                    <StyledDiv draggingOver={snapshot.draggingOver}>
                      <Card>
                        <ReOrderDotsVertical size="20px" />
                        <Alignment>
                          {index < NUM_LIFELINES_DISPLAYED && index + 1}
                        </Alignment>
                      </Card>
                      <LifelineCard
                        index={index}
                        lifeline={lifeline}
                        isDisplayed={index < NUM_LIFELINES_DISPLAYED}
                      />
                    </StyledDiv>
                    {/* render delete button */}
                    <TrashAlt
                      size={'1.5em'}
                      onClick={() => deleteLifeline(index)}
                      style={{
                        gridColumn: 3,
                        cursor: 'pointer',
                      }}
                    />
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
