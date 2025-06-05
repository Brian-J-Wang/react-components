import requireContext from "../../utilities/requireContext";
import { RichInputContext } from "./RichInput";
import { createUID } from "../../utilities/createUID";
import { useEffect, useState } from "react";
import BoundingBox from "../../utilities/boundingBox";

import styles from "../styles/AttributeMenu.module.css"

type AttributeMenuProps = React.HTMLAttributes<HTMLDivElement> & { }

/** The component that renders all attribute children it controls when it shows up based on the input state*/
const AttributeMenu: React.FC<AttributeMenuProps> = ({className, ...props}) => {
    const { state } = requireContext(RichInputContext);
    const [ id ] = useState<string>(createUID());
    const isHidden = state.current == "none" || state.current == "primary";

    useEffect(() => {
        state.setId("menu", id);
    }, []);

    const changeState = () => {
        state.setState("none");
    }

    return (
        <BoundingBox isActive={!isHidden} id={id} className={`${isHidden ? styles.menu__hidden : className}`} 
        {...props} onOutOfBound={changeState}>
            {props.children}   
        </BoundingBox>
    )
}

export default AttributeMenu;