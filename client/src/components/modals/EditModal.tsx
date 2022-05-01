import '@reach/dialog/styles.css'

import { DialogContent, DialogOverlay } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import { PencilFill } from '@styled-icons/bootstrap'
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

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 35px;
  margin-left: auto;
  margin-right: auto;
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
`

const StyledHeader = styled.h1`
  font-family: ${({ theme }) => theme.secondaryFonts};
  font-size: 24px;
  color: black;
  font-weight: 500;
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

const ModalContainer = styled.div`
  place-self: center;
`

//prop for lifeline index
function EditModal({ index }: { index: number }) {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
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

  // reset values back to original : close
  // function CloseModal() {
  // }
  function PopulateModal() {
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
    }
    open()
  }
  function onSubmit(e) {
    e.preventDefault()
    const LifelineArray = localStorage.getItem('lifelines')
    console.log(LifelineArray)
    if (LifelineArray) {
      const lifeline = JSON.parse(LifelineArray)[index]
      console.log(lifeline)
      lifeline.labels[0] = e.target[0].value
      lifeline.initial = parseFloat(e.target[1].value)

      const newLifelines = JSON.parse(LifelineArray)
      newLifelines[index] = lifeline
      console.log(newLifelines)
      localStorage.setItem('lifelines', JSON.stringify(newLifelines))
    }
    close()
  }
  useEffect(() => {
    // storing input title
    localStorage.setItem('title', JSON.stringify(title))
  }, [title])
  useEffect(() => {
    // storing input title
    localStorage.setItem('statistic', JSON.stringify(statistic))
  }, [statistic])
  useEffect(() => {
    // storing input title
    localStorage.setItem('source', JSON.stringify(source))
  }, [source])
  useEffect(() => {
    // storing input title
    localStorage.setItem('link', JSON.stringify(link))
  }, [link])
  return (
    <ModalContainer>
      <PencilFill
        onClick={PopulateModal}
        size={'1.5em'}
        style={{
          justifySelf: 'center',
          cursor: 'pointer',
          alignSelf: 'center',
          gridColumn: 3,
        }}
      />
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
            <StyledHeader>Edit Lifeline</StyledHeader>
            <StyledDescription>
              Enter a title and statistic to create your personal Lifeline. The
              citation and rate are optional.
            </StyledDescription>
            <StyledForm onSubmit={onSubmit}>
              <div>
                <StyledLabel>Title</StyledLabel>
                <StyledInput
                  onChange={(e) => {
                    setTitle(e.target.value)
                  }}
                  value={title}
                  required={true}
                  placeholder={'Ex: World’s Energy From Renewables'}
                />
              </div>
              <div>
                <StyledLabel>Statistic</StyledLabel>
                <StyledInput
                  onChange={(e) => {
                    setStatistic(e.target.value)
                  }}
                  value={statistic}
                  required={true}
                  placeholder={'Ex: 12.77155930'}
                  type={'number'}
                />
              </div>
              <div>
                <StyledLabel>Source (Optional)</StyledLabel>
                <StyledInput
                  onChange={(e) => {
                    setSource(e.target.value)
                  }}
                  value={source}
                  required={false}
                  placeholder={'Ex: WRI'}
                  type={'text'}
                />
              </div>
              <div>
                <StyledLabel>Citation Link (Optional)</StyledLabel>
                <StyledInput
                  onChange={(e) => {
                    setLink(e.target.value)
                  }}
                  value={link}
                  type={'text'}
                  placeholder={
                    'Ex: https://www.wri.org/?gclid=CjwKCAjwrfCRBhAXEiwAnkmKmWhnLs_cSR3ZNsGwvjy-zsk4n3JIKDPnvPFqLVcHjye'
                  }
                  required={false}
                />
              </div>
              <div></div>
              <StyledSubmit type="submit" buttonLabel={'Update'}></StyledSubmit>
            </StyledForm>
          </StyledDialogContainer>
        </DialogContent>
      </DialogOverlay>
    </ModalContainer>
  )
}

export default EditModal
