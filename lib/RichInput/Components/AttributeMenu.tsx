import styles from "../styles/AttributeMenu.module.css"
import { forwardRef, useState } from "react";
import requireContext from "../../utilities/requireContext";
import { RichInputContext } from "./RichInput";
import { createUID } from "../../utilities/createUID";

type AttributeMenuProps = React.HTMLAttributes<HTMLDivElement> & { }

const AttributeMenu = forwardRef<HTMLDivElement, AttributeMenuProps>(({className, ...props} , ref) => {
    const { inputState } = requireContext(RichInputContext);
    const [ _id ] = useState<string>(createUID()); 
    return (
        <div ref={ inputState.popupMenu } id={_id} className={`${inputState.menuVisible ? className : styles.menu__hidden}`} {...props} tabIndex={-1}>
            {props.children}   
        </div>
    )
});

export default AttributeMenu;
