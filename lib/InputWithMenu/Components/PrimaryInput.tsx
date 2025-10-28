import RequireContext from "../../utilities/requireContext";
import { InputWithMenuContext } from "../Contexts/inputWithMenuContext";


import "../styles/PrimaryInput.module.css";

type RichInputInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
}

const PrimaryInput: React.FC<RichInputInputProps> = ({className, ...props}) => {
    const { input, setInput, setMenuMode, submit, primaryInputElement } = RequireContext(InputWithMenuContext);

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if (evt.key == "/" && input.length == 0) {
            evt.preventDefault();
            setMenuMode("select");
        }

        if (evt.key == "Enter") {
            submit();
        }
    }

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setInput(evt.target.value);
    }

    const handleFocus = () => {
        setMenuMode("hidden");
    }

    return (
        <input value={input} onKeyDown={handleKeyDown} onChange={handleChange} className={`primary-input ${className}`} 
        onFocus={handleFocus} ref={primaryInputElement} {...props}/>
    )
}

export default PrimaryInput;
