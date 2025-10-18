import { createContext } from "react";

type NavigableMenuContextProps = {
    handleHover: (name: string) => void,
    handleClick: (name: string) => void,
    activeNode: string
}
export const NavigableMenuContext = createContext<NavigableMenuContextProps>({ handleHover: () => {}, handleClick: () => {}, activeNode: ""});