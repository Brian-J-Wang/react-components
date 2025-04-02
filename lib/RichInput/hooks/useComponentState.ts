import { useRef, useState } from "react";

type ComponentState = "none" | "primary" | "secondary" | "menu";
export type StateController = {
    current: ComponentState,
    setId: ( types: Omit<ComponentState, "none">, id: string ) => void,
    setState: ( newState: ComponentState ) => void
}

export default function useInputState() {
    const primaryInputId = useRef<string>("");
    const secondaryInputId = useRef<string>("");
    const attributeMenuId = useRef<string>("");
    const [ state, _setState ] = useState<ComponentState>("none");

    const setId = ( types: Omit<ComponentState, "none">, id: string ) => {
        switch(types) {
            case "primary":
                primaryInputId.current = id;
                break;
            case "secondary":
                secondaryInputId.current = id;
                break;
            case "menu":
                attributeMenuId.current = id;
                break;
        }
    }

    const setState = (newState: ComponentState) => {
        switch(newState) {
            case "none":
                break;
            case "primary":
                document.getElementById(primaryInputId.current)?.focus();
                break;
            case "secondary":
                document.getElementById(secondaryInputId.current)?.focus();
                break;
            case "menu":
                document.getElementById(attributeMenuId.current)?.focus();
                break;
        }

        _setState(newState);
    }

    return {
        current: state,
        setId,
        setState,
    }
}