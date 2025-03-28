import { useState, forwardRef, useRef, RefObject } from "react";

import "./ResizeableInput.css"
import { twMerge } from "tailwind-merge";

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

        console.log(spanRef.current.getBoundingClientRect().width);
        
        return spanRef.current.getBoundingClientRect().width + 4.3;
    }

    return (
        <>
            <span ref={spanRef} className={`resizeable__span pointer-events-none absolute ${className}`}></span>
            <input style={{ ...style, width: calculateWidth()}} className={twMerge("box-content outline-none border-[1px] rounded pl-2 pr-2 bg-opacity-0 bg-white", className)} 
            ref={ref} onChange={handleChange} value={value ?? defaultValue} onBlur={onBlur} {...props}/>
        </>
    )
})

export default ResizeableInput;