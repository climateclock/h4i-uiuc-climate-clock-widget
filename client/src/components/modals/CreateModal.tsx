import { useState } from 'react';
import '@reach/dialog/styles.css';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import VisuallyHidden from "@reach/visually-hidden";
import styled from 'styled-components'
import { Close } from '@styled-icons/evaicons-solid'

const CloseButton = styled(Close)`
  color: #575757;
  height: 36px;
  width: 36px;
  cursor: pointer;
`;

const StyledDialogContainer = styled.div`
    .close-button {
        float: right;
    }
    padding: 0.5em;
`;

const StyledForm = styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 35px;
    margin-left: auto;
    margin-right: auto;
`;
const StyledLabel = styled.label`
   font-family: Lato;
   display:block;
   font-size: 16px;
`;

const StyledInput = styled.input`
   display:block;
   font-family: Lato;
   width: 100%;
   border: 1px solid #000;
   font-size: 16px;
   border-radius: 3px;
`;

const StyledHeader = styled.h1`
    font-family: Lato;
    font-size: 24px;
    color: black;
    font-weight: 500;
`;

const StyledDescription = styled.p`
    font-family: Lato;
    font-size: 16px;

`;

const StyledSubmit = styled.button`
    display: block;
    margin-left: auto;
    margin-right: 0;
`;

//git stash, git pull
//how to change font on text style
//input and useStates to store the value
//style the form 
//CSS goes at the top
//hook in and change the font to Lato

function CreateModal() {
    const [showDialog, setShowDialog] = useState(false);
    const open = () => setShowDialog(true);
    const close = () => setShowDialog(false);
    const [formData, setFormData] = useState({
        title: "",
        statistic: "",
        source: "",
        link: "",
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        
    }
    return(
    <div>
      <button onClick={open}>Show Dialog</button>
      <DialogOverlay isOpen={showDialog} onDismiss={close}>
        <DialogContent
          style={{
            border: "solid 1px hsla(0, 0%, 0%, 0.5)",
            borderRadius: "10px",
            width: "650px",
            height: "338px",
          }}
        >
        <StyledDialogContainer>
        <CloseButton className="close-button" onClick={close}>
           <VisuallyHidden>Close</VisuallyHidden>
              <span aria-hidden>X</span>
        </CloseButton>
          <StyledHeader>Create a Lifeline</StyledHeader>
          <StyledDescription>Enter a title and statistic to create your personal Lifeline. The citation and rate are optional.</StyledDescription>
        <StyledForm onSubmit={handleSubmit}>
        <div>
            <StyledLabel>Title</StyledLabel>
            <StyledInput
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                value={formData.title}
                required={true}
                placeholder={'Ex: World’s Energy From Renewables'}
            />
        </div>
        <div>
            <StyledLabel>Statistic</StyledLabel>
            <StyledInput
                onChange={(e) => setFormData({...formData, statistic: e.target.value})}
                value={formData.statistic}
                required={true}
                placeholder={'Ex: 12.77155930'}
                type={'number'}
            />
        </div>
        <div>
            <StyledLabel>Source (Optional)</StyledLabel>
            <StyledInput
                onChange={(e) => setFormData({...formData, source: e.target.value})}
                value={formData.source}
                required={true}
                placeholder={'Ex: WRI'}
                type={'text'}
            />
        </div>
        <div>
            <StyledLabel>Citation Link (Optional)</StyledLabel>
            <StyledInput
                onChange={(e) => setFormData({...formData, link: e.target.value})}
                value={formData.link}
                type={'text'}
                placeholder={'Ex: https://www.wri.org/?gclid=CjwKCAjwrfCRBhAXEiwAnkmKmWhnLs_cSR3ZNsGwvjy-zsk4n3JIKDPnvPFqLVcHjye'}
            />
        </div>
        <div>
        </div>
        <StyledSubmit type="submit">Create</StyledSubmit>
        </StyledForm>
          </StyledDialogContainer>
        </DialogContent>
      </DialogOverlay>
    </div>
    )
}

export default CreateModal;