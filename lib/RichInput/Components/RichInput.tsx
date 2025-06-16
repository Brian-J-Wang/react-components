import { createContext, ReactNode, useEffect, useState } from "react";
import useCursor, { CursorController } from "../Hooks/useCursor";
import useInputState, { InputStateController } from "../Hooks/useInputState";
import useAttributes, { AttributesController } from "../Hooks/useAttributes";
import useEventState from "../Hooks/useEventState";

interface RichInputContextProps {
    cursor: CursorController,
    inputState: InputStateController,
    attribute: AttributesController,
    setAttributeValue: (value: any) => void
    primaryInput: string,
    setPrimaryInput: React.Dispatch<React.SetStateAction<string>>,
    secondaryInput: string,
    setSecondaryInput: (value: string) => void,
    submit: () => void
}

export type SubmissionItem = {
    input: string,
    attributes: {
        key: string,
        value: any
    }[]
}

export const RichInputContext = createContext<RichInputContextProps | undefined>(undefined);

interface RichInputProps {
    className?: string
    children: ReactNode,
    onSubmit: (submission: SubmissionItem) => Promise<void>,
}

type InputStates = "none" | "primary" | "secondary" | "menu";

/**
 * Represents the three different input states the user can be in.
 * @param notFocused input isn't selected.
 * @param textInput user is typing the main body of text.
 * @param filteringAttribute user has typed the keyword and is now looking their attribute.
 * @param selectingValue user is setting the value for their attribute.
 */
export const RichInput: React.FC<RichInputProps> = (props) => {
    const inputState = useInputState();
    const cursor = useCursor();
    const attribute = useAttributes();
    const [ primaryInput, setPrimaryInput ] = useState<string>("");
    const [ secondaryInput, setSecondaryInput ] = useState<string>("");

    useEffect(() => {
        if (inputState.menuVisible == false) {
            cursor.jumpToIndex(0);
        }
    }, [inputState.menuVisible])

    const setAttributeValue = (value: any) => {
        attribute.add({
            key: cursor.current.name,
            value: value
        });
    }

    const submit = () => {
        props.onSubmit({
            input: primaryInput,
            attributes: attribute.current
        }).then(() => {
            setPrimaryInput("");
            attribute.clear();
        }).catch(() => {
            //prevents the input from reseting 
        })
    }

    return (
        <RichInputContext.Provider value={{
            cursor, inputState, attribute, setAttributeValue, primaryInput, setPrimaryInput, secondaryInput, setSecondaryInput, submit
        }}>
            <div className={props.className}>
                {props.children}
            </div>
        </RichInputContext.Provider>
    )
}