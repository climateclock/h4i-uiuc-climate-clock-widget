import '@reach/dialog/styles.css'

import { DialogContent, DialogOverlay } from '@reach/dialog'
import { Close } from '@styled-icons/evaicons-solid'
import { useState } from 'react'
import styled from 'styled-components'

import Button from '../buttons/button'
import { LifelineInterface } from '../settings/LifelineCreationForm'

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

const FormGrid = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 35px;
  margin-right: 25px;
  margin-bottom: 20px;
`
const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.secondaryFonts};
  display: block;
  font-size: 16px;
`

const ErrorLabel = styled(StyledLabel)`
  color: ${({ theme }) => theme.red};
`

const StyledInput = styled.input`
  display: block;
  font-family: ${({ theme }) => theme.secondaryFonts};
  border: 1px solid #000;
  font-size: 16px;
  border-radius: 3px;
  margin-top: 10px;
  padding: 10px;
  width: 100%;
`

const CitationColumn = styled.div`
  grid-column-end: span 2;
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

const StyledSubmit = styled(Button)`
  display: block;
  margin-left: auto;
  margin-right: 0;
`

function CreateModal({
  formSubmit,
}: {
  formSubmit: (LifeLineInterface) => void
}) {
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)
  const open = () => setShowDialog(true)
  const close = () => {
    setShowErrorMessage(false)
    setShowDialog(false)
  }
  const defaultFormData = {
    title: '',
    statistic: null,
    unit: '',
    rate: 0,
    source: '',
    link: '',
  }
  const [formData, setFormData] = useState<LifelineInterface>(defaultFormData)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title !== '' && formData.statistic !== null) {
      const LifelineArray = localStorage.getItem('lifelines')

      if (LifelineArray) {
        const lifeline = {}

        lifeline['labels'] = [formData.title]
        lifeline['initial'] = formData.statistic
        lifeline['source'] = formData.source
        lifeline['link'] = formData.link
        lifeline['unit_labels'] = [formData.unit]

        const newLifelines = JSON.parse(LifelineArray)

        newLifelines.push(lifeline)
        localStorage.setItem('lifelines', JSON.stringify(newLifelines))
      }
      close()
      setShowErrorMessage(false)
      formSubmit(formData)
      setFormData(defaultFormData)
    } else {
      setShowErrorMessage(true)
    }
  }
  return (
    <div>
      <Button onClick={open} buttonLabel={'Create new lifeline'} />
      <DialogOverlay isOpen={showDialog} onDismiss={close}>
        <DialogContent
          aria-label="create modal"
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
              <span aria-hidden>X</span>
            </CloseButton>
            <StyledHeader>Create a Lifeline</StyledHeader>
            <StyledDescription>
              Enter a title and statistic to create your personal Lifeline. The
              citation, rate, and unit are optional.
            </StyledDescription>
            <form onSubmit={handleSubmit}>
              <FormGrid>
                <div>
                  <StyledLabel>Title</StyledLabel>
                  <StyledInput
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    value={formData.title}
                    required
                    placeholder={'Ex: World’s Energy From Renewables'}
                  />
                </div>
                <div>
                  <StyledLabel>Statistic</StyledLabel>
                  <StyledInput
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        statistic: parseInt(e.target.value) ?? e.target.value,
                      })
                    }
                    value={formData.statistic ?? 0}
                    required
                    placeholder={'Ex: 12.77155930'}
                    type={'number'}
                  />
                </div>
                <div>
                  <StyledLabel>Unit (Optional)</StyledLabel>
                  <StyledInput
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        unit: e.target.value,
                      })
                    }
                    value={formData.unit}
                    placeholder={'Ex: KM'}
                    type={'text'}
                  />
                </div>
                <div>
                  <StyledLabel>Source (Optional)</StyledLabel>
                  <StyledInput
                    onChange={(e) =>
                      setFormData({ ...formData, source: e.target.value })
                    }
                    value={formData.source}
                    placeholder={'Ex: WRI'}
                    type={'text'}
                  />
                </div>
                <div>
                  <StyledLabel>Rate (Optional)</StyledLabel>
                  <StyledInput
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rate: parseInt(e.target.value),
                      })
                    }
                    value={formData.rate}
                    placeholder={'Ex: 1.2 m/s'}
                    type={'number'}
                  />
                </div>
                <CitationColumn>
                  <StyledLabel>Citation Link (Optional)</StyledLabel>
                  <StyledInput
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    value={formData.link}
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

              <StyledSubmit type="submit" buttonLabel={'Create'}></StyledSubmit>
            </form>
          </StyledDialogContainer>
        </DialogContent>
      </DialogOverlay>
    </div>
  )
}

export default CreateModal
