import styled from 'styled-components'

const StyledButton = styled.button`
    background-color: #619FC8;
    border: none;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    margin: 4px 2px;
    display: inline-block;
    color: white;
    border-radius: 5px;
    font-size: 12px;
    font-weight: 700;
    padding: 10px 15px;
//    font-family: <Lato></Lato>;
    &:hover {
        background-image: linear-gradient(rgba(0, 0, 0, 0.06) 0 0);
    }
`;

const HideButton = styled(StyledButton)`
    background: white;
    border: 1px solid gray;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    margin: 4px 2px;
    display: inline-block;
    color: black;
    border-radius: 3px;
    font-size: 12px;
    padding: 6.5px 20px;
    font-weight: 500;
//    font-family: <Lato></Lato>;
    &:hover {
       background-color: #F1F1F1;
    }
`;

const Button = ({ buttonLabel }) => {
    return <StyledButton>{ buttonLabel }</StyledButton>
}
export default Button;