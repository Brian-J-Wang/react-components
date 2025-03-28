import { createContext, ReactNode, useState } from "react";
import useCursor, { CursorController } from "./hooks/useCursor";
import useComponentState, { StateController } from "./hooks/useComponentState";
import useAttributes, { AttributesController } from "./hooks/useAttributesController";


interface RichInputContextProps {
    cursor: CursorController,
    state: StateController,
    attribute: AttributesController,
    setAttributeValue: (value: any) => void
    primaryInput: string,
    setPrimaryInput: React.Dispatch<React.SetStateAction<string>>,
    secondaryInput: string,
    setSecondaryInput: React.Dispatch<React.SetStateAction<string>>
}

export const RichInputContext = createContext<RichInputContextProps>({
    //@ts-ignore
    cursor: {

    },
    //@ts-ignore
    state: {

    },
    //@ts-ignore
    attribute: {
        
    },
    setAttributeValue: () => {},
    primaryInput: "",
    setPrimaryInput: () => {},
    secondaryInput: "",
    setSecondaryInput: () => {}
});

interface RichInputProps {
    className?: string
    children: ReactNode,
    onSubmit: () => void,
}

/**
 * Represents the three different input states the user can be in.
 * @param notFocused input isn't selected.
 * @param textInput user is typing the main body of text.
 * @param filteringAttribute user has typed the keyword and is now looking their attribute.
 * @param selectingValue user is setting the value for their attribute.
 */

const RichInput: React.FC<RichInputProps> = (props) => {
    const state = useComponentState();
    const cursor = useCursor();
    const attribute = useAttributes();
    const [ primaryInput, setPrimaryInput ] = useState<string>("");
    const [ secondaryInput, setSecondaryInput ] = useState<string>("");

    const setAttributeValue = (value: any) => {
        attribute.add({
            key: cursor.current.name,
            value: value
        });
        state.setState("primary");
    }

    return (
        <RichInputContext.Provider value={{
            cursor, state, attribute, setAttributeValue, primaryInput, setPrimaryInput, secondaryInput, setSecondaryInput
        }}>
            <div className={props.className}>
                {props.children}
            </div>
        </RichInputContext.Provider>
    )
}

export default RichInput;