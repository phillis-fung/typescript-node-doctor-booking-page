import styled from "styled-components"

interface buttonInterface {
    display?: string | undefined;
    color?: string | undefined;
    width?: string |undefined;
    backgroundColor?: string |undefined;
}

const Button = styled.button<buttonInterface>`
    border: 2px solid;
    outline: none;
    border-radius: 25px;
    text-align: center;
    color: ${props => props.color === undefined? '#ff408e' : props.color};
    background-color: ${props => props.backgroundColor === undefined? '#fff' : props.backgroundColor};
    line-height: 20px;
    font-size: 16px;
    width: ${props => props.display === undefined? '75%' : props.width};
    :disabled{
        opacity: 0.5
    }
    display: ${props => props.display === undefined? 'block' : props.display};
    margin: 0 auto;
    margin-bottom: 1vh;
`;

export default Button;