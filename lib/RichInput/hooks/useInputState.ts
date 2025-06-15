import { RefObject, SetStateAction, useEffect, useRef, useState } from "react";

type InputType = "primary" | "secondary";
type InputState = InputType | "none";
type MenuState = "key" | "value";
export type InputStateController = {
    primaryInput: React.RefObject<HTMLInputElement | null>,
    secondaryInput: React.RefObject<HTMLDivElement | null>,
    popupMenu: React.RefObject<HTMLDivElement | null>,
    switchFocus: (type: InputType) => void,
    currentFocus: InputState,
    menuVisible: boolean,
    setMenuVisible: React.Dispatch<SetStateAction<boolean>>,
    menuState: MenuState,
    setMenuState: React.Dispatch<SetStateAction<MenuState>>
}

export default function useInputState(): InputStateController {
    const primaryInput = useRef<HTMLInputElement>(null) as RefObject<HTMLInputElement>;
    const secondaryInput = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
    const popupMenu = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
    const [ currentFocus, setCurrentFocus ] = useState<InputState>("none");
    const [ menuVisible, setMenuVisible ] = useState<boolean>(false);
    const [ menuState, setMenuState ] = useState<MenuState>("key");
 
    useEffect(() => {
        if (!primaryInput.current) return;

        primaryInput.current.addEventListener("focus", setCurrentInputToPrimary);
        primaryInput.current.addEventListener("blur", resolveCurrentInput(primaryInput.current));

        //events listeners are removed by GC when element is removed
    }, [primaryInput]);

    const setCurrentInputToPrimary = () => {
        setCurrentFocus("primary");
    }

    useEffect(() => {
        if (!secondaryInput.current) return;

        secondaryInput.current.addEventListener("focus", setCurrentInputToSecondary);
        secondaryInput.current.addEventListener("blur", resolveCurrentInput(secondaryInput.current));

    }, [secondaryInput]);

    const setCurrentInputToSecondary = () => {
        setCurrentFocus("secondary");
    }

    useEffect(() => {
        console.log(`the current focus is now ${currentFocus}`);
        if (currentFocus == "none") {
            setMenuVisible(false);
            setMenuState("key");
        } else if ( currentFocus == "primary") {
            setMenuVisible(false);
            setMenuState("key");
        } else if ( currentFocus == "secondary") {
            setMenuVisible(true);
        }
    }, [currentFocus])

    const resolveCurrentInput = (el: HTMLDivElement) => (ev: FocusEvent) => {
        //refocuses the cursor on the secondary input if the click was within the popup menu
        if (el == secondaryInput.current) {
            if (ev.relatedTarget == popupMenu.current) {
                el.focus();
            }
        }
        
        if (ev.relatedTarget != primaryInput.current && ev.relatedTarget != secondaryInput.current && ev.relatedTarget != popupMenu.current) {
            setCurrentFocus("none");
        }
    }

    const switchFocus = (type: InputType) => {
        if (type == "primary") {
            primaryInput.current.focus();
        } else {
            secondaryInput.current.focus();
        }
    }

    return {
        primaryInput,
        secondaryInput,
        popupMenu,
        switchFocus,
        currentFocus,
        menuVisible,
        setMenuVisible,
        menuState,
        setMenuState
    }
}