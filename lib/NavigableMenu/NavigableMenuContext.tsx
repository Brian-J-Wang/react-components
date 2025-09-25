import { createContext } from "react";

type NavigableMenuContextProps = {
    handleHover: (name: string) => void,
    handleClick: (name: string) => void
}
export const NavigableMenuContext = createContext<NavigableMenuContextProps>({ handleHover: () => {}, handleClick: () => {}});