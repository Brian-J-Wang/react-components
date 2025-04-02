import { useEffect, useState } from "react";
import { createUID } from "../utilities/createUID";
import requireContext from "../utilities/requireContext";
import { RichInputContext } from "./RichInput";
import { twMerge } from "tailwind-merge";

type RichInputInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
}

const PrimaryInput: React.FC<RichInputInputProps> = ({className, placeholder, ...props}) => {
    const { state, primaryInput, setPrimaryInput } = requireContext(RichInputContext);
    const [ id ] = useState(createUID());

    useEffect(() => {
        state.setId("primary", id);
    }, [])
    
    const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if (evt.key == "/" && primaryInput.length == 0) {
            evt.preventDefault();
            state.setState("secondary")
        }

        if (evt.key == "Enter") {
            //submits the thing
        }
    }

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setPrimaryInput(evt.target.value);
    }

    const handleFocus = () => {
        state.setState("primary");
    }

    const _placeholder = () => {
        if (state.current == "secondary" || state.current == "menu") {
            return "";
        } else {
            return placeholder;
        }
    }

    return (
        <input id={id} value={primaryInput} onKeyDown={handleKeyDown} onChange={handleChange} className={twMerge('w-full', className)} 
        placeholder={_placeholder()} 
        onFocus={handleFocus} {...props}/>
    )
}

export default PrimaryInput;
