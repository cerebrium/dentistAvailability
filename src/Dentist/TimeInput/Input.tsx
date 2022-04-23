import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useGraphProvider } from '../../GraphContext/context-provider';

type Props = {
    number: number;
}

const InputComponent: React.FC<Props> = ({ number}) => {
    const [value, setValue] = useState<string>('')
    const [trigger, {}] = useGraphProvider()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const validate = () => {
        let parsedValue;
        try {
            let wrapped_string = value.replace(/\w+/g, '"$&"')
            parsedValue = JSON.parse(wrapped_string)
        } catch (e) {
            return false
        }
        if (!Array.isArray(parsedValue)) {
            return false
        } 

        parsedValue.forEach((arg: any) => {
            if (typeof arg === 'object' && !Array.isArray(arg) && arg !== null) {
                if (arg.hasOwnProperty('start') && arg.hasOwnProperty('end')) {
                    if (typeof arg.start !== 'number' || typeof arg.end !== 'number') {
                        return false
                    }
                }
            }
        })

        // Turn values to numbers
        parsedValue = parsedValue.map((arg: any) => {
            if (typeof arg === 'object' && !Array.isArray(arg) && arg !== null) {
                if (arg.hasOwnProperty('start') && arg.hasOwnProperty('end')) {
                    arg.start = parseInt(arg.start)
                    arg.end = parseInt(arg.end)
                }
            }
            return arg
        })

        trigger({
            value: number,
            schedules: parsedValue
        })
        return true
    }

    const handleBlur = () => {
        if (!validate()) {
            toast.error('Not Valid input, need: [{start: number, end: number}]')
        }
    }


    return (
        <StyledInput onChange={handleChange} value={value} onBlur={handleBlur}>
        </StyledInput>
    )
}

const StyledInput = styled.input`
    background-color: white;
    height: 40%;
    width: 80%;
    border: none;
    border-radius: 3px;
    font-size: 20px;
    :hover {
        cursor: pointer;
        transition: .3s;
        background-color: #3c3c3b;
        color: white;
    }
    :focus {
        outline: none;
        background-color: #3c3c3b;
        color: white;
    }
`

export default InputComponent;