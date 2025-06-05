import { forwardRef, useEffect, useState } from "react";

import styles from "./ResizeableInput.module.css"
import { createUID } from "../utilities/createUID";

type InputProps = React.InputHTMLAttributes<HTMLDivElement> & {
    onEnterPressed?: () => void;
    onTextChange?: (newValue: string) => void;
};

/** Input that resizes based on the user input. Single line only*/
const ResizeableInput = forwardRef<HTMLDivElement, InputProps>(({ onEnterPressed, className, onTextChange, onKeyDown, id, ...props}, ref) => {
    const [ _id ] = useState(id ?? createUID());

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
        if (evt.key == "Enter") {
            evt.preventDefault();

            if (onEnterPressed) onEnterPressed();
        }

        if (onKeyDown) onKeyDown(evt);
    }

    useEffect(() => {
        const mutationObserver = new MutationObserver((records) => {
            if (onTextChange) onTextChange(records[0].target.textContent ?? "");
        });

        const element = document.getElementById(_id);

        mutationObserver.observe(element!, {
            subtree: true,
            characterData: true
        });

        return () => {
            mutationObserver.disconnect();
        }
    }, []);

    return (
        <>
            <div ref={ref} id={_id} className={`${styles.resizeable__input} ${className}`} onKeyDown={handleKeyDown} 
            contentEditable {...props} spellCheck="false" onBlur={props.onBlur}/>
            {/* <span ref={spanRef} className={`${styles.resizeable__span} ${className}`}></span>
            <input style={{ ...style, width: calculateWidth()}} className={`${styles.resizeable__input} ${className}`} 
            ref={ref} onChange={handleChange} value={value ?? defaultValue} onBlur={onBlur} {...props}/> */}
        </>
    )
})

export default ResizeableInput;