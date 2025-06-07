import { SetStateAction, useState } from "react";

type menuStates = "key" | "value"
export type MenuController = {
    visible: boolean,
    setVisible: React.Dispatch<SetStateAction<boolean>>,
    state: menuStates,
    setState: React.Dispatch<SetStateAction<menuStates>>
}

export default function useMenu(): MenuController {
    const [ visible, setVisible] = useState<boolean>(false);
    const [ state, setState ] = useState<menuStates>("key");
    
    return {
        visible,
        setVisible,
        state,
        setState
    }
}