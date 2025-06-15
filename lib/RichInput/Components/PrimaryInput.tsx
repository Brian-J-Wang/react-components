import { useState } from "react";
import { createUID } from "../../utilities/createUID";
import requireContext from "../../utilities/requireContext";
import { RichInputContext } from "./RichInput";

import "../styles/PrimaryInput.module.css";

type RichInputInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
}

const PrimaryInput: React.FC<RichInputInputProps> = ({className, placeholder, ...props}) => {
    const { inputState: state, primaryInput, setPrimaryInput, submit } = requireContext(RichInputContext);
    const [ id ] = useState(createUID());

    
    const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if (evt.key == "/" && primaryInput.length == 0) {
            evt.preventDefault();
            state.switchFocus("secondary");
        }

        if (evt.key == "Enter") {
            submit();
        }
    }

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setPrimaryInput(evt.target.value);
    }

    const _placeholder = () => {
        return placeholder;
    }

    return (
        <input id={id} value={primaryInput} onKeyDown={handleKeyDown} onChange={handleChange} className={`primary-input ${className}`} 
        placeholder={_placeholder()} ref={state.primaryInput} {...props}/>
    )
}

export default PrimaryInput;
