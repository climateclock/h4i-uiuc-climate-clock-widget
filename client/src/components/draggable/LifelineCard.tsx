import styled from 'styled-components'

import { ModuleResInterface } from '../../interfaces'
import { returnFirstString } from '../../utils/utils'
import { LifelineDropdown } from '../lifelines/Dropdown'

interface LifelineCardInterface {
  index: number
  lifeline: ModuleResInterface
  isDisplayed: boolean
  onDelete: (index: number) => void
}
const Card = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px 10px 10px;
`
const Text = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0;
  justify-content: center;
`

const Lifeline = styled.div`
  font-weight: 700;
  font-size: 18px;
  font-family: ${({ theme }) => theme.text};
`

const Source = styled.div`
  margin-top: 8px;
  font-weight: 400;
  font-size: 18px;
  font-family: ${({ theme }) => theme.text};
`

const LifelineCard = ({
  index,
  lifeline: { labels, customizable },
  isDisplayed,
  onDelete,
}: LifelineCardInterface) => {
  return (
    <>
      <Card>
        <Text>
          <Lifeline>{returnFirstString(labels)}</Lifeline>
          <Source>{customizable ? '' : 'Climate Clock'}</Source>
        </Text>
        <LifelineDropdown
          isCustomizable={customizable}
          isDisplayed={isDisplayed}
          onDelete={onDelete}
          index={index}
        />
      </Card>
    </>
  )
}

export default LifelineCard
