import { createContext, ReactNode, RefObject, useRef, useState } from "react";
import useAttributes, { AttributesController } from "../Hooks/useAttributes";
import useEventState, { useEventStateReturn } from "../Hooks/useEventState";

type ValidInputStates = "none" | "primary" | "menuKey" | "menuValue";

interface RichInputContextProps {
    primaryInput: RefObject<HTMLInputElement>,
    secondaryInput: RefObject<HTMLDivElement>,
    popupMenu: RefObject<HTMLDivElement>,
    resolveInputBlur: (ev: React.FocusEvent<HTMLElement>) => void,
    inputState: useEventStateReturn<ValidInputStates>,
    attribute: AttributesController,
    setAttributeValue: (value: string) => void,
    activeAttribute: ReactNode | null,
    setActiveAttribute: (element: ReactNode) => void,
    submit: (input: string) => Promise<void>
}

export type SubmissionItem = {
    input: string,
    attributes: {
        key: string,
        value: string
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
    const primaryInput = useRef<HTMLInputElement>(null) as RefObject<HTMLInputElement>;
    const secondaryInput = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
    const popupMenu = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
    const inputState = useEventState<ValidInputStates>("none");
    const attribute = useAttributes();
    const [ activeAttribute, setActiveAttribute ] = useState<ReactNode | null>(null);

    const resolveInputBlur = (ev: React.FocusEvent<HTMLElement>) => {
        //refocuses the cursor on the secondary input if the click was within the popup menu
        if (ev.relatedTarget == popupMenu.current) {
            ev.preventDefault();
            ev.target.focus();
        }

        //prevents state from changing if clicking was done within the popupMenu
        if (ev.relatedTarget?.closest(`#${popupMenu.current.id}`)) {
            return;
        }
        
        if (ev.relatedTarget != primaryInput.current && ev.relatedTarget != secondaryInput.current && ev.relatedTarget != popupMenu.current) {
            inputState.setState("none");
        }
    }

    const setAttributeValue = (value: string) => {
        attribute.add({
            key: "temp",
            value: value
        });
        inputState.setState("none");
    }

    const submit = (input: string) => {
        return props.onSubmit({
            input: input,
            attributes: attribute.current
        }).then(() => {
            attribute.clear();
        })
    }

    return (
        <RichInputContext.Provider value={{
            primaryInput, secondaryInput, popupMenu, resolveInputBlur, activeAttribute, setActiveAttribute, inputState, attribute, setAttributeValue, submit
        }}>
            <div className={props.className}>
                {props.children}
            </div>
        </RichInputContext.Provider>
    )
}