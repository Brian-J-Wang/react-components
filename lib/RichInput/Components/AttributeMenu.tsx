import styles from "../styles/AttributeMenu.module.css";
import requireContext from "../../utilities/requireContext";
import { RichInputContext } from "./RichInput";
import { createUID } from "../../utilities/createUID";
import { useState } from "react";
import NavigableMenu from "../../NavigableMenu/NavigableMenu";
import FilterableList from "../../FilterableList/FilterableList";

type AttributeMenuProps = React.HTMLAttributes<HTMLDivElement> & { 
    /** this class styling will be added to the node that is focused */
    activeClass?: string
}

const AttributeMenu: React.FC<AttributeMenuProps> = ({className, activeClass, ...props}) => {
    const { inputState, popupMenu, activeAttribute } = requireContext(RichInputContext);
    const [ _id ] = useState<string>(createUID());

    const menuVisible = inputState.state == "menuKey" || inputState.state == "menuValue";

    return (
        <div id={_id} ref={popupMenu} className={`${menuVisible ? className : styles.menu__hidden}`} {...props} tabIndex={-1}>
            {
                activeAttribute ? activeAttribute : 
                <NavigableMenu activeClass={activeClass ?? ""} active={menuVisible}>
                    <FilterableList filter={""}>
                        {props.children}
                    </FilterableList>
                </NavigableMenu>
            }
        </div>
    )
};

export default AttributeMenu;
