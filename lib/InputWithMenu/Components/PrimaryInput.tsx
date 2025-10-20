import RequireContext from "../../utilities/requireContext";
import { InputWithMenuContext } from "../Contexts/inputWithMenuContext";


import "../styles/PrimaryInput.module.css";

type RichInputInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
}

const PrimaryInput: React.FC<RichInputInputProps> = ({className, ...props}) => {
    const { input, setInput, setMenuVisible, submit } = RequireContext(InputWithMenuContext);

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if (evt.key == "/" && input.length == 0) {
            evt.preventDefault();
            setMenuVisible(true);
        }

        if (evt.key == "Enter") {
            submit();
        }
    }

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setInput(evt.target.value);
    }

    const handleFocus = () => {
        setMenuVisible(false);
    }

    return (
        <input value={input} onKeyDown={handleKeyDown} onChange={handleChange} className={`primary-input ${className}`} 
        onFocus={handleFocus} {...props}/>
    )
}

export default PrimaryInput;
