import { useEffect, useState } from "react";
import requireContext from "../../utilities/requireContext"
import { RichInputContext } from "./RichInput";
import ResizeableInput from "../../ResizbleInput/ResizeableInput";

import styles from "../styles/SecondaryInput.module.css";

type SecondaryInputProps = React.HTMLAttributes<HTMLDivElement> & {}

/** Handles the rendering of the input when inputing attributes */
export const SecondaryInput: React.FC<SecondaryInputProps> = ({className, ...props}) => {
    const { inputState, secondaryInput, resolveInputBlur } = requireContext(RichInputContext);
    const [ input, setInput ] = useState<string>("");

    useEffect(() => {
        const clearOnBlur = inputState.addStateEffect("*", "none", () => {
            if (secondaryInput.current) {
                secondaryInput.current.textContent = "";
            }
            setInput("");
        });

        const primaryToSecondary = inputState.addStateEffect("primary", "menuKey", () => {
            focusOnInput();
        })

        const menuValueToMenuKey = inputState.addStateEffect("menuValue", "menuKey", () => {
            setInput("something" + ":");
        });

        const menuKeyToMenuValue = inputState.addStateEffect("menuKey", "menuValue", () => {
            if (secondaryInput.current) {
                secondaryInput.current.textContent = "";
            }
            setInput("");
        });

        return () => {
            inputState.removeStateEffect(clearOnBlur);
            inputState.removeStateEffect(primaryToSecondary);
            inputState.removeStateEffect(menuValueToMenuKey);
            inputState.removeStateEffect(menuKeyToMenuValue);
        }
    });

    const handleChange = (newValue: string) => {
        setInput(newValue);
    }

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
        if (evt.key == "Tab") {
            evt.preventDefault();
        }
        
        if (evt.key == "Backspace" && (evt.target as HTMLDivElement).textContent?.length == 0) {
            if (inputState.state == "menuKey") {
                inputState.setState("primary");
            } else {
                inputState.setState("menuKey");
                
            }
        }

        if (evt.key == "Enter") {
            inputState.setState("menuValue");
        }
    }

    const focusOnInput = () => {
        secondaryInput.current?.focus();
    }

    const shouldBeHidden = () => {
        return inputState.state != "menuKey" && inputState.state != "menuValue";
    }

    return (
        <div className={`${shouldBeHidden() ? styles['secondary-input__hidden'] : `${styles['secondary-input']} ${className}`}`} onClick={focusOnInput}>
            <p className={styles['secondary-input__span']}>/{"Attribute"}</p>
            <ResizeableInput className={styles['secondary-input__input']} ref={secondaryInput}
            onTextChange={handleChange} value={input} onKeyDown={handleKeyDown} onBlur={resolveInputBlur} {...props}/>
        </div>
    )
}

export default SecondaryInput;