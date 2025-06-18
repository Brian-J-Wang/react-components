import { useState } from "react";
import requireContext from "../../utilities/requireContext";
import { RichInputContext } from "./RichInput";

import "../styles/PrimaryInput.module.css";

type RichInputInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
}

const PrimaryInput: React.FC<RichInputInputProps> = ({className, ...props}) => {
    const { inputState, submit, primaryInput, resolveInputBlur } = requireContext(RichInputContext);
    const [ input, setInput ] = useState<string>("");

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if (evt.key == "/" && input.length == 0) {
            evt.preventDefault();
            inputState.setState("menuKey");
        }

        if (evt.key == "Enter") {
            submit(input).then(() => {
                setInput("");
            });
        }
    }

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setInput(evt.target.value);
    }

    const handleFocus = () => {
        inputState.setState("primary");
    }

    return (
        <input ref={primaryInput} value={input} onKeyDown={handleKeyDown} onChange={handleChange} className={`primary-input ${className}`} 
        onFocus={handleFocus} onBlur={resolveInputBlur} {...props}/>
    )
}

export default PrimaryInput;
