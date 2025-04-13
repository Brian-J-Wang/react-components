import { useEffect, useState } from "react";
import requireContext from "../../utilities/requireContext"
import { RichInputContext } from "./RichInput";
import { createUID } from "../../utilities/createUID";
import ResizeableInput from "../../ResizbleInput/ResizeableInput";

import styles from "../styles/SecondaryInput.module.css";

type SecondaryInputProps = React.HTMLAttributes<HTMLDivElement> & {}

/** Handles the rendering of the input when inputing attributes */
export const SecondaryInput: React.FC<SecondaryInputProps> = ({className, ...props}) => {
    const { cursor, state, secondaryInput, setSecondaryInput } = requireContext(RichInputContext);
    const [ id ] = useState<string>(createUID());

    useEffect(() => {
        state.setId("secondary", id);
    }, []);

    useEffect(() => {
        setSecondaryInput("");
    }, [state.current]);

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if (evt.key == "Tab") {
            evt.preventDefault();
        }
        
        if (evt.key == "ArrowUp" || evt.key == "ArrowDown") {
            evt.preventDefault();

            if (state.current == "secondary") cursor.move(evt.key == "ArrowUp" ? "up" : "down");
        }

        if (evt.key == "Backspace" && (evt.target as HTMLInputElement).value.length == 0) {
            if (state.current == "menu") {
                state.setState("secondary");
                //extra space to prevent backspace from clipping of end of attribute name
                setSecondaryInput(cursor.current.name + " ");
            } else {
                state.setState("primary");
            }
        }

        if (evt.key == "Enter") state.setState("menu");
    }

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setSecondaryInput(evt.target.value);
    }

    const handleFocus = () => {
        state.setState("secondary");
    }

    const handleBlur = () => {
        // setText("");
        // richInputContext.setInputState("notFocused");
    }

    const shouldBeHidden = () => {
        return state.current != "secondary" && state.current != "menu";
    }

    const getAttribute = () => {
        if (state.current == "menu") {
            return cursor.current.name + ":";
        } else {
            return "";
        }
    }

    return (
        <div className={`${shouldBeHidden() ? styles['secondary-input__hidden'] : `${styles['secondary-input']} ${className}`}`}>
            <p className={styles['secondary-input__span']}>/{getAttribute()}</p>
            <ResizeableInput id={id} className={styles['secondary-input__input']} {...props}
            onChange={handleChange} value={secondaryInput} onKeyDown={handleKeyDown} onBlur={handleBlur} onFocus={handleFocus}/>
        </div>
    )
}

export default SecondaryInput;