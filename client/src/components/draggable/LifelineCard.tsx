import { ModuleResInterface } from '../../interfaces'
import { returnFirstString } from '../../utils/utils'

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
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '0',
            marginBottom: '3%',
          }}
        >
          <div
            style={{
              fontWeight: '700',
              fontSize: '18px',
              fontFamily: `${({ theme }) => theme.text}`,
            }}
          >
            {returnFirstString(labels)}
          </div>
          <div
            style={{
              fontWeight: '400',
              fontSize: '18px',
              fontFamily: `${({ theme }) => theme.text}`,
            }}
          >
            {customizable ? '' : 'Climate Clock'}
          </div>
        </div>
      </div>
      <div>
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
      </div>
    </div>
  )
}

export default LifelineCard
