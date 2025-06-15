import { useEffect, useState } from "react";
import requireContext from "../../utilities/requireContext"
import { RichInputContext } from "./RichInput";
import { createUID } from "../../utilities/createUID";
import ResizeableInput from "../../ResizbleInput/ResizeableInput";

import styles from "../styles/SecondaryInput.module.css";

type SecondaryInputProps = React.HTMLAttributes<HTMLDivElement> & {}

/** Handles the rendering of the input when inputing attributes */
export const SecondaryInput: React.FC<SecondaryInputProps> = ({className, ...props}) => {
    const { cursor, inputState, secondaryInput, setSecondaryInput } = requireContext(RichInputContext);
    const [ id ] = useState<string>(createUID());

    useEffect(() => {
        if (inputState.menuVisible == false) {
            setSecondaryInput("");
        }
    }, [inputState.menuVisible]);

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
        if (evt.key == "Tab") {
            evt.preventDefault();
        }
        
        if ((evt.key == "ArrowUp" || evt.key == "ArrowDown") && inputState.menuState == "key") {
            evt.preventDefault();
            cursor.shiftCursor(evt.key == "ArrowUp" ? "up" : "down");
        }

        if (evt.key == "Backspace" && (evt.target as HTMLDivElement).textContent?.length == 0) {
            if (inputState.menuState == "key") {
                inputState.switchFocus("primary");
            } else {
                inputState.setMenuState("key");
                setSecondaryInput(cursor.current.name + ":");
            }
        }

        if (evt.key == "Enter") {
            inputState.setMenuState("value");
            if (inputState.secondaryInput.current) {
                inputState.secondaryInput.current.textContent = "";
            }
            setSecondaryInput("");
        }
    }

    useEffect(() => {
        if (inputState.menuState == "value") {
            if (inputState.secondaryInput.current) {
                inputState.secondaryInput.current.textContent = "";
            }
            setSecondaryInput("");
        }
    }, [inputState.menuState]);

    const handleChange = (newValue: string) => {
        setSecondaryInput(newValue);
        
        if (inputState.menuState == "key") {
            cursor.filterAttribute(newValue);
        }
    }

    const focusOnInput = () => {
        inputState.secondaryInput.current?.focus();
    }

    const shouldBeHidden = () => {
        return inputState.currentFocus != "secondary" && !inputState.menuVisible;
    }

    const getAttribute = () => {
        if (inputState.menuState == "value") {
            console.log(cursor.current);
            return cursor.current.name + ":";
        } else {
            return "";
        }
    }

    return (
        <div className={`${shouldBeHidden() ? styles['secondary-input__hidden'] : `${styles['secondary-input']} ${className}`}`} onClick={focusOnInput}>
            <p className={styles['secondary-input__span']}>/{getAttribute()}</p>
            <ResizeableInput id={id} className={styles['secondary-input__input']} ref={inputState.secondaryInput}
            onTextChange={handleChange} value={secondaryInput} onKeyDown={handleKeyDown} {...props}/>
        </div>
    )
}

export default SecondaryInput;