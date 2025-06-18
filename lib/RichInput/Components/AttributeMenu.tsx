import styles from "../styles/AttributeMenu.module.css";
import requireContext from "../../utilities/requireContext";
import { RichInputContext } from "./RichInput";
import { createUID } from "../../utilities/createUID";
import { useState } from "react";

type AttributeMenuProps = React.HTMLAttributes<HTMLDivElement> & { }

const AttributeMenu: React.FC<AttributeMenuProps> = ({className, ...props}) => {
    const { inputState, popupMenu } = requireContext(RichInputContext);
    const [ _id ] = useState<string>(createUID());

    const menuVisible = inputState.state == "menuKey" || inputState.state == "menuValue";

    return (
        <div id={_id} ref={popupMenu} className={`${menuVisible ? className : styles.menu__hidden}`} {...props} tabIndex={-1}>
            {props.children}   
        </div>
    )
};

export default AttributeMenu;
