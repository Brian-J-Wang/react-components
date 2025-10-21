import { createContext, RefObject, SetStateAction } from "react";
import { ArrayCursorController } from "../Hooks/useCursor";
import { MenuItem } from "./menuContext";

interface InputWithMenuContextProps {
    input: string,
    setInput: React.Dispatch<SetStateAction<string>>,
    menuVisible: boolean,
    setMenuVisible: React.Dispatch<SetStateAction<boolean>>
    submit: () => void;
    cursor: ArrayCursorController<MenuItem>,
    primaryInputElement: RefObject<HTMLInputElement> | undefined,
    menuInputElement: RefObject<HTMLInputElement> | undefined,
    menuMode: "select" | "display",
    onHandles: {
        onArrowUpPress: () => void,
        onArrowDownPress: () => void,
        onEnterPress: () => void,
        onBackspacePress: () => void
    }
}

export const InputWithMenuContext = createContext<InputWithMenuContextProps | undefined>(undefined);