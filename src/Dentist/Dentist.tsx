import React from 'react';
import styled from 'styled-components';
import { InputComponent } from './TimeInput';

type Props = {
    value: number;
    name: string;
}

const Dentist: React.FC<Props> = ({value, name}) => {
    return (
        <StyledDentist>
            <h2>{`Dr. ${name}`}</h2>
            <InputComponent number={value}/>
        </StyledDentist>
    )
}

const StyledDentist = styled.div`
    display: block;
    background-color: #1b1b1c;
    height: 150px;
    width: 600px;
    font-size: 14px;
    border-radius: 10px;
    margin: 5px;
    border: 1px solid #3c3c3b;
    text-align: center;
    :hover {
        box-shadow: 0 0 10px #3c3c3b;
    }
`;

export default Dentist;