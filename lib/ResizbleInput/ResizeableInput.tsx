import { forwardRef, useEffect, useState } from "react";

import styles from "./ResizeableInput.module.css"
import { createUID } from "../utilities/createUID";

type InputProps = React.HTMLAttributes<HTMLDivElement> & {
    onEnterPressed?: () => void;
    onTextChange?: (newValue: string) => void;
    value?: string;
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
        if (props.value) {
            const element = document.getElementById(_id);
            if (element) {
                element.innerText = props.value;

                const range = document.createRange();
                const selection = window.getSelection();

                range.setStart(element, 1);
                range.collapse();

                selection?.removeAllRanges();
                selection?.addRange(range);
            }
        }
        
    }, [props.value])

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
    }, [ onTextChange, _id]);

    return (
        <>
            <div ref={ref} id={_id} className={`${styles.resizeable__input} ${className}`} onKeyDown={handleKeyDown} 
            contentEditable {...props} spellCheck="false" onBlur={props.onBlur}/>
        </>
    )
})

export default ResizeableInput;