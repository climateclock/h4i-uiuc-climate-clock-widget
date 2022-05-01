import { ModuleResInterface } from '../../interfaces'
import { returnFirstString } from '../../utils/utils'
import styled from 'styled-components'

interface LifelineCardInterface {
  lifeline: ModuleResInterface
  isDisplayed: boolean
}
const Card = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`
const Text = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0;
  margin-bottom: 3%;
`

const Lifeline = styled.div`
  font-weight: 700;
  font-size: 18px;
  font-family: ${({ theme }) => theme.text};
`

const Source = styled.div`
  font-weight: 400;
  font-size: 18px;
  font-family: ${({ theme }) => theme.text};
`
const HideButton = styled.p`
  font-size: 0.8em;
  border: 1px black solid;
  padding: 5px 7.5px;
  border-radius: 5px;
  text-align: center;
  align-self: center;
  grid-column: 2;
`
const LifelineCard = ({
  lifeline: { labels, customizable },
  isDisplayed,
}: LifelineCardInterface) => {
  return (
    <Card>
      <Text>
        <Lifeline>{returnFirstString(labels)}</Lifeline>
        <Source>{customizable ? '' : 'Climate Clock'}</Source>
      </Text>
      <HideButton>{isDisplayed ? 'Hide' : 'Show'}</HideButton>
    </Card>
  )
}

export default LifelineCard
