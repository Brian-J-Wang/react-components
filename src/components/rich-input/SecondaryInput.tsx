import { useEffect, useState } from "react";
import requireContext from "../../utilities/requireContext"
import { RichInputContext } from "./RichInput";
import { createUID } from "../../utilities/createUID";
import ResizeableInput from "../ResizbleInput/ResizeableInput";
import { twMerge } from "tailwind-merge";

interface AttributeDisplayProps {
    className?: string
}

/** Handles the rendering of the input when inputing attributes */
export const SecondaryInput: React.FC<AttributeDisplayProps> = (props) => {
    const { cursor, state }= requireContext(RichInputContext);
    const [ id ] = useState<string>(createUID());
    const [ text, setText ] = useState<string>("");

    useEffect(() => {
        state.setId("secondary", id);
    }, []);

    useEffect(() => {
        setText("");
    }, [state.current]);

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if (evt.key == "Tab") {
            evt.preventDefault();
        }
        
        if (evt.key == "ArrowUp" || evt.key == "ArrowDown") {
            evt.preventDefault();
            cursor.move(evt.key == "ArrowUp" ? "up" : "down");
        }

        if (evt.key == "Backspace" && (evt.target as HTMLInputElement).value.length == 0) {
            state.setState("primary");
        }

        if (evt.key == "Enter") state.setState("menu");
    }

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setText(evt.target.value);
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
        <div className={`${shouldBeHidden() ? "border-0 w-0 px-0 overflow-hidden " : twMerge("flex pl-[6px] pr-1",props.className)}`}>
            <p className="-translate-y-[2px] text-nowrap">/{getAttribute()}</p>
            <ResizeableInput id={id} className="border-none p-0 "
            onChange={handleChange} value={text} onKeyDown={handleKeyDown} onBlur={handleBlur} onFocus={handleFocus}/>
        </div>
    )
}

export default SecondaryInput;