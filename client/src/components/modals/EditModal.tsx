import '@reach/dialog/styles.css'

import { DialogContent, DialogOverlay } from '@reach/dialog'
import { VisuallyHidden } from '@reach/visually-hidden'
import { Close } from '@styled-icons/evaicons-solid'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import StyledButton from '../buttons/button'

const CloseButton = styled(Close)`
  color: #575757;
  height: 36px;
  width: 36px;
  cursor: pointer;
`

const StyledDialogContainer = styled.div`
  .close-button {
    float: right;
  }
  padding: 0.5em;
`

const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.secondaryFonts};
  display: block;
  font-size: 16px;
`

const StyledInput = styled.input`
  display: block;
  font-family: ${({ theme }) => theme.secondaryFonts};
  width: 100%;
  border: 1px solid #000;
  font-size: 16px;
  border-radius: 3px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
`

const StyledHeader = styled.h1`
  font-family: ${({ theme }) => theme.secondaryFonts};
  font-size: 24px;
  color: black;
  font-weight: 500;
`
const ErrorLabel = styled(StyledLabel)`
  color: ${({ theme }) => theme.red};
`

const StyledDescription = styled.p`
  font-family: ${({ theme }) => theme.secondaryFonts};
  font-size: 16px;
`

const StyledSubmit = styled(StyledButton)`
  display: block;
  margin-left: auto;
  margin-right: 0;
`
const CitationColumn = styled.div`
  grid-column-end: span 2;
`

const ModalContainer = styled.div`
  place-self: center;
`
const FormGrid = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 35px;
  margin-right: 25px;
  margin-bottom: 20px;
`

//prop for lifeline index
function EditModal({
  index,
  showDialog,
  setShowDialog,
}: {
  index: number
  showDialog: boolean
  setShowDialog: (boolean) => void
}) {
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)
  const close = () => setShowDialog(false)
  const [title, setTitle] = useState(() => {
    // getting stored value
    const LifelineArray = localStorage.getItem('lifelines')
    if (LifelineArray) {
      const saved = JSON.parse(LifelineArray)[index]
      if (saved) {
        const initialValue = saved.labels[0]
        return initialValue || ''
      }
    }
  })
  const [statistic, setStatistic] = useState(() => {
    // getting stored value
    const LifelineArray = localStorage.getItem('lifelines')
    if (LifelineArray) {
      const saved = JSON.parse(LifelineArray)[index]
      if (saved) {
        const initialValue = saved.initial
        return parseFloat(initialValue) || 0
      }
    }
  })

  const [source, setSource] = useState(() => {
    // getting stored value
    const LifelineArray = localStorage.getItem('lifelines')
    if (LifelineArray) {
      const saved = JSON.parse(LifelineArray)[index]
      if (saved) {
        const initialValue = saved.source
        return initialValue || ''
      }
    }
  })
  const [link, setLink] = useState(() => {
    // getting stored value
    const LifelineArray = localStorage.getItem('lifelines')
    if (LifelineArray) {
      const saved = JSON.parse(LifelineArray)[index]
      if (saved) {
        const initialValue = saved.link
        return initialValue || ''
      }
    }
  })

  const [unit, setUnit] = useState<string>(() => {
    const LifelineArray = localStorage.getItem('lifelines')
    if (LifelineArray) {
      const saved = JSON.parse(LifelineArray)[index]
      if (saved) {
        const initialValue = saved.unit_labels[0]
        console.log(initialValue)
        return initialValue || ''
      }
    }
  })

  const [rate, setRate] = useState(() => {
    const LifelineArray = localStorage.getItem('lifelines')
    if (LifelineArray) {
      const saved = JSON.parse(LifelineArray)[index]
      if (saved) {
        const initialValue = saved.rate
        return initialValue || 0
      }
    }
  })

  function onSubmit() {
    if (title !== '' && statistic !== 0) {
      const LifelineArray = localStorage.getItem('lifelines')

      if (LifelineArray) {
        const lifeline = JSON.parse(LifelineArray)[index]
        lifeline.labels[0] = title
        lifeline.initial = statistic
        lifeline.source = source
        lifeline.link = link
        lifeline.unit_labels[0] = unit

        const newLifelines = JSON.parse(LifelineArray)
        newLifelines[index] = lifeline
        console.log(newLifelines)
        localStorage.setItem('lifelines', JSON.stringify(newLifelines))
      }
      close()
      setShowErrorMessage(false)
    } else {
      setShowErrorMessage(true)
    }
  }
  useEffect(() => {
    const LifelineArray = localStorage.getItem('lifelines')
    if (LifelineArray) {
      const lifeline = JSON.parse(LifelineArray)[index]
      setTitle(lifeline.labels[0])
      setStatistic(lifeline.unit_labels)
      if (lifeline.source) {
        setSource(lifeline.source)
      }
      if (lifeline.link) {
        setLink(lifeline.link)
      }
      if (lifeline.initial) {
        setStatistic(lifeline.initial)
      }
      if (lifeline.unit_labels) {
        setUnit(lifeline.unit_labels[0])
      }
    }
  }, [index, setShowDialog, showDialog])

  return (
    <ModalContainer>
      <DialogOverlay isOpen={showDialog} onDismiss={close}>
        <DialogContent
          style={{
            border: 'solid 1px hsla(0, 0%, 0%, 0.5)',
            borderRadius: '10px',
            width: '45%',
            left: '50%',
            top: '50%',
            marginTop: '200px',
          }}
        >
          <StyledDialogContainer>
            <CloseButton className="close-button" onClick={close}>
              <VisuallyHidden>Close</VisuallyHidden>
              <span aria-hidden>X</span>
            </CloseButton>
            <StyledHeader>Create a Lifeline</StyledHeader>
            <StyledDescription>
              Enter a title and statistic to create your personal Lifeline. The
              citation and rate are optional.
            </StyledDescription>
            <form onSubmit={onSubmit}>
              <FormGrid>
                <div>
                  <StyledLabel>Title</StyledLabel>
                  <StyledInput
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                    placeholder={'Ex: World’s Energy From Renewables'}
                  />
                </div>
                <div>
                  <StyledLabel>Statistic</StyledLabel>
                  <StyledInput
                    onChange={(e) => setStatistic(e.target.value)}
                    value={statistic}
                    required
                    placeholder={'Ex: 12.77155930'}
                    type={'number'}
                  />
                </div>
                <div>
                  <StyledLabel>Unit</StyledLabel>
                  <StyledInput
                    onChange={(e) => setUnit(e.target.value)}
                    value={unit}
                    placeholder={'Ex: KM'}
                    type={'text'}
                  />
                </div>
                <div>
                  <StyledLabel>Source (Optional)</StyledLabel>
                  <StyledInput
                    onChange={(e) => setSource(e.target.value)}
                    value={source}
                    placeholder={'Ex: WRI'}
                    type={'text'}
                  />
                </div>
                <div>
                  <StyledLabel>Rate (Optional)</StyledLabel>
                  <StyledInput
                    onChange={(e) => setRate(parseInt(e.target.value))}
                    value={rate}
                    placeholder={'Ex: 1.2 m/s'}
                    type={'number'}
                  />
                </div>
                <CitationColumn>
                  <StyledLabel>Citation Link (Optional)</StyledLabel>
                  <StyledInput
                    onChange={(e) => setLink(e.target.value)}
                    value={link}
                    type={'text'}
                    placeholder={
                      'Ex: https://www.wri.org/?gclid=CjwKCAjwrfCRBhAXEiwAnkmKmWhnLs_cSR3ZNsGwvjy-zsk4n3JIKDPnvPFqLVcHjye'
                    }
                  />
                </CitationColumn>
              </FormGrid>
              {showErrorMessage ? (
                <ErrorLabel>Missing required fields</ErrorLabel>
              ) : (
                <></>
              )}

              <StyledSubmit type="submit" buttonLabel={'Save'}></StyledSubmit>
            </form>
          </StyledDialogContainer>
        </DialogContent>
      </DialogOverlay>
    </ModalContainer>
  )
}

export default EditModal
