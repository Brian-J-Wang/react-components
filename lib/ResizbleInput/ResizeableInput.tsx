import { useState, forwardRef, useRef, RefObject } from "react";

import styles from "./ResizeableInput.module.css"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    onInputChange?: (evt: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => void;
};

/** Input that resizes based on the user input. Do NOT modify box-sizing, it will mess up width calculations. */
const ResizeableInput = forwardRef<HTMLInputElement, InputProps>(({ style, className, onChange, onInputChange, value, onBlur, ...props}, ref) => {
    const [defaultValue, setDefaultValue] = useState<string>("");
    const spanRef = useRef<HTMLSpanElement>(undefined) as RefObject<HTMLSpanElement>;

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(evt);
        } else {
            setDefaultValue(evt.target.value);
        }
    }

    const calculateWidth = () => {
        if (!spanRef.current) return 4.3;

        spanRef.current.innerHTML = value as string ?? defaultValue;
        
        return spanRef.current.getBoundingClientRect().width + 4.3;
    }

    return (
        <>
            <span ref={spanRef} className={`${styles.resizeable__span} ${className}`}></span>
            <input style={{ ...style, width: calculateWidth()}} className={`${styles.resizeable__input} ${className}`} 
            ref={ref} onChange={handleChange} value={value ?? defaultValue} onBlur={onBlur} {...props}/>
        </>
    )
})

export default ResizeableInput;