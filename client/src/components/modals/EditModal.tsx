import { useState, useEffect } from 'react';
import '@reach/dialog/styles.css';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import VisuallyHidden from "@reach/visually-hidden";
import styled from 'styled-components'
import { Close } from '@styled-icons/evaicons-solid'
import StyledButton from '../buttons/button';
import { PencilFill } from '@styled-icons/bootstrap';
import Lifeline from '../lifelines/Lifeline';


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
   font-family: ${({ theme }) => theme.secondaryFonts};
   display:block;
   font-size: 16px;
`;

const StyledInput = styled.input`
   display:block;
   font-family: ${({ theme }) => theme.secondaryFonts};
   width: 100%;
   border: 1px solid #000;
   font-size: 16px;
   border-radius: 3px;
`;

const StyledHeader = styled.h1`
    font-family: ${({ theme }) => theme.secondaryFonts};
    font-size: 24px;
    color: black;
    font-weight: 500;
`;

const StyledDescription = styled.p`
    font-family: ${({ theme }) => theme.secondaryFonts};
    font-size: 16px;

`;

const StyledSubmit = styled(StyledButton)`
    display: block;
    margin-left: auto;
    margin-right: 0;
`

const ModalContainer = styled.div`
    place-self:center;

`;

//prop for lifeline index
function EditModal({ index } : { index : number}) {
    const [showDialog, setShowDialog] = useState(false);
    const open = () => setShowDialog(true);
    const close = () => setShowDialog(false);
    const [title, setTitle] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("title");
        if (saved) {
            const initialValue = JSON.parse(saved);
            return initialValue || "";
        }
      })
    const [statistic, setStatistic] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("statistic");
        if (saved) {
            const initialValue = JSON.parse(saved);
            return initialValue || "";
        }
      })
    const [source, setSource] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("source");
        if (saved) {
            const initialValue = JSON.parse(saved);
            return initialValue || "";
        }
      })
    const [link, setLink] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("link");
        if (saved) {
            const initialValue = JSON.parse(saved);
            return initialValue || "";
        }
      })

    // reset values back to original : close
    // function CloseModal() {
    // }
    function PopulateModal() {
        const LifelineArray = localStorage.getItem("lifelines")
        if (LifelineArray) {
            const lifeline = JSON.parse(LifelineArray)[index]
            setTitle(lifeline.labels[0])
            console.log(lifeline.description)
            setStatistic(lifeline.unit_labels)
            if (lifeline.source) {
                setSource(lifeline.source)
            }
            if (lifeline.link) {
                setLink(lifeline.link)
            }  
        }
        console.log(showDialog)
        open()
    } 
    function Submit() {
        const LifelineArray = localStorage.getItem("lifelines")
        if (LifelineArray) {
            const lifeline = JSON.parse(LifelineArray)[index]
            localStorage.setItem(lifeline.labels[0], title);
        }
        close()
    }
    useEffect(() => {
        // storing input title
        localStorage.setItem("title", JSON.stringify(title));
      }, [title]);
    useEffect(() => {
    // storing input title
        localStorage.setItem("statistic", JSON.stringify(statistic));
    }, [statistic]);
    useEffect(() => {
        // storing input title
        localStorage.setItem("source", JSON.stringify(source));
    }, [source]);
    useEffect(() => {
        // storing input title
        localStorage.setItem("link", JSON.stringify(link));
    }, [link]);
    return(
        
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
            border: "solid 1px hsla(0, 0%, 0%, 0.5)",
            borderRadius: "10px",
            width: "45%",
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
          <StyledDescription>Enter a title and statistic to create your personal Lifeline. The citation and rate are optional.</StyledDescription>
        <StyledForm>
        <div>
        <StyledLabel>Title</StyledLabel>
            <StyledInput
                onChange={(e) => { setTitle(e.target.value) }}
                value={title}
                required={true}
                placeholder={'Ex: World’s Energy From Renewables'}
            />
        </div>
        <div>
        <StyledLabel>Statistic</StyledLabel>
            <StyledInput
            onChange={(e) => { setStatistic(e.target.value) }}
            value={statistic}
            required={true}
            placeholder={'Ex: 12.77155930'}
            type={'number'}
            />
        </div>
        <div>
        <StyledLabel>Source (Optional)</StyledLabel>
        <StyledInput
          onChange={(e) => { setSource(e.target.value) }}
          value={source}
          required={true}
          placeholder={'Ex: WRI'}
          type={'text'}
        />
        </div>
        <div>
        <StyledLabel>Citation Link (Optional)</StyledLabel>
            <StyledInput
            onChange={(e) => { setLink(e.target.value) }}
            value={link}
            type={'text'}
            placeholder={'Ex: https://www.wri.org/?gclid=CjwKCAjwrfCRBhAXEiwAnkmKmWhnLs_cSR3ZNsGwvjy-zsk4n3JIKDPnvPFqLVcHjye'}
            />
        </div>
        <div>
        </div>
        <StyledSubmit buttonLabel={ "Update" } onClick={Submit}></StyledSubmit>
        </StyledForm>
          </StyledDialogContainer>
        </DialogContent>
      </DialogOverlay>
    </ModalContainer>
    )
}

export default EditModal;

