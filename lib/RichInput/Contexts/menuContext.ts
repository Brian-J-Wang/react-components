import { createContext } from "react";
import { MenuController } from "../Hooks/useMenu";

export const MenuContext = createContext<MenuController>(
    {
        visible: false,
        setVisible: () => {},
        state: "key",
        setState: () => {}
    }
)