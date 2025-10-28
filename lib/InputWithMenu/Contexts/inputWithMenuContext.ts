import { createContext, RefObject, SetStateAction } from "react";
import { ArrayCursorController } from "../Hooks/useCursor";
import { MenuItem } from "./menuContext";

export type validMenuStates = "hidden" | "select" | "display";

interface InputWithMenuContextProps {
    input: string,
    setInput: React.Dispatch<SetStateAction<string>>,
    submit: () => void,
    cursor: ArrayCursorController<MenuItem>,
    primaryInputElement: RefObject<HTMLInputElement> | undefined,
    menuInputElement: RefObject<HTMLInputElement> | undefined,
    menuMode: validMenuStates,
    setMenuMode: (mode: validMenuStates) => void;
    onHandles: {
        onArrowUpPress: () => void,
        onArrowDownPress: () => void,
        onEnterPress: () => void,
        onBackspacePress: () => void
        onMenuItemClick: (item: MenuItem) => void,
        onMenuItemHover: (item: MenuItem) => void
    }
}

export const InputWithMenuContext = createContext<InputWithMenuContextProps | undefined>(undefined);