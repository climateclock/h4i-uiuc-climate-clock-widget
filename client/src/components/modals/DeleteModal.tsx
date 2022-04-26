import { useState } from 'react';
import '@reach/dialog/styles.css';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import { Close } from '@styled-icons/evaicons-solid'
import VisuallyHidden from "@reach/visually-hidden";
import styled from 'styled-components'

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
    .element {
        text-align: center;
        padding-top: 60px;
    }
    .description {
        text-align: center;
        padding-top: 5px;
        padding-bottom: 60px;
        font-size: 16px;
    }
    .button {
        float: right;
        margin: 10px;
        font-size: 12px;
    }
    .cancel {
        float: right;
        margin: 10px;
        font-size: 12px;
        background: none;
        border-color: transparent;
        cursor: pointer;
    }

`;

const StyledHeader = styled.h1`
    font-family: Lato;
    font-size: 24px;
    color: black;
    font-weight: 500;
`;

const StyledDescription = styled.p`
    font-family: Lato;
    font-size: 14px;
`;


function DeleteModal() {
    const [showDialog, setShowDialog] = useState(false);
    const open = () => setShowDialog(true);
    const close = () => setShowDialog(false);
    return(
    <div>
      <button onClick={open}>Show Dialog</button>
      <DialogOverlay isOpen={showDialog} onDismiss={close}>
      <DialogContent
          style={{
            border: "solid 1px hsla(0, 0%, 0%, 0.5)",
            borderRadius: "10px",
            width: "325px",
            height: "255px",
          }}
        >
        <StyledDialogContainer>
        <CloseButton className="close-button" onClick={close}>
           <VisuallyHidden>Close</VisuallyHidden>
              <span aria-hidden>X</span>
        </CloseButton>
          <StyledHeader className="element">Delete Lifeline</StyledHeader>
          <StyledDescription className="description">Do you want to delete this lifeline?</StyledDescription>
          <button className="button">Delete</button>
          <button className="cancel">Cancel</button>
          </StyledDialogContainer>
        </DialogContent>
      </DialogOverlay>
    </div>
    )
}

export default DeleteModal;