import { createContext, ReactNode } from "react";

export type MenuItem = {
    name: string,
    id: string,
    content: ReactNode
}

type MenuContext = {
    filter: string,
    setFilter: ( filter: string ) => void,
    menuItems: MenuItem[]
}

const menuContext = createContext<MenuContext>({
    filter: "",
    setFilter: () => {},
    menuItems: []
});

export default menuContext;