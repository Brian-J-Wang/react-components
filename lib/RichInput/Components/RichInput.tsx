import { createContext, ReactNode, useState } from "react";
import useCursor, { CursorController } from "../Hooks/useCursor";
import useComponentState, { StateController } from "../Hooks/useComponentState";
import useAttributes, { AttributesController } from "../Hooks/useAttributes";

interface RichInputContextProps {
    cursor: CursorController,
    state: StateController,
    attribute: AttributesController,
    setAttributeValue: (value: any) => void
    primaryInput: string,
    setPrimaryInput: React.Dispatch<React.SetStateAction<string>>,
    secondaryInput: string,
    setSecondaryInput: (value: string) => void,
    submit: () => void
}

type SubmissionItem = {
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

/**
 * Represents the three different input states the user can be in.
 * @param notFocused input isn't selected.
 * @param textInput user is typing the main body of text.
 * @param filteringAttribute user has typed the keyword and is now looking their attribute.
 * @param selectingValue user is setting the value for their attribute.
 */

export const RichInput: React.FC<RichInputProps> = (props) => {
    const state = useComponentState();
    const cursor = useCursor();
    const attribute = useAttributes();
    const [ primaryInput, setPrimaryInput ] = useState<string>("");
    const [ secondaryInput, _setSecondaryInput ] = useState<string>("");

    const setAttributeValue = (value: any) => {
        attribute.add({
            key: cursor.current.name,
            value: value
        });
        state.setState("primary");
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

    const setSecondaryInput = (input: string) => {

        cursor.attributes.forEach((attribute) => {
            if (attribute.name.slice(0, input.length) == input) {
                attribute.hidden = false
            } else {
                attribute.hidden = true
            }
        })
        cursor.updateCursor();
        _setSecondaryInput(input);
    }

    return (
        <RichInputContext.Provider value={{
            cursor, state, attribute, setAttributeValue, primaryInput, setPrimaryInput, secondaryInput, setSecondaryInput, submit
        }}>
            <div className={props.className}>
                {props.children}
            </div>
        </RichInputContext.Provider>
    )
}