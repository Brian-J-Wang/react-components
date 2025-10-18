import { ChangeEvent } from "react";
import requireContext from "../../utilities/requireContext";
import menuContext from "../Contexts/menuContext";

import styles from "../styles/MenuInput.module.css";
import { InputWithMenuContext } from "../Contexts/inputWithMenuContext";

type MenuInputProps = React.HTMLAttributes<HTMLInputElement> & {}

/** Handles the rendering of the input when inputing attributes */
export const MenuInput: React.FC<MenuInputProps> = ({className, ...props}) => {
    const { cursor, menuInputElement } = requireContext(InputWithMenuContext);
    const { filter, setFilter } = requireContext(menuContext);

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setFilter(evt.target.value);
    }

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
        if (evt.key == "Tab") {
            evt.preventDefault();
        }
        
        if (evt.key == "Backspace") {
            //TODO: Switch menu input back to the primary input and hide menu
        }

        if (evt.key == "Enter") {
            //TODO: Set menu to render the element when it is selected
        }

        if (evt.key == "ArrowUp") {
            evt.preventDefault();
            cursor.moveCursor("down", (item) => {
                return item.id.substring(0, filter.length) == filter;
            });//
        } else if (evt.key == "ArrowDown") {
            evt.preventDefault();
            cursor.moveCursor("up", (item) => {
                return item.id.substring(0, filter.length) == filter;
            });
        }
    }

    return (
        <input ref={menuInputElement} type="text" className={`${styles['menu-input']} ${className}`} {...props} onKeyDown={handleKeyDown} onChange={handleChange} value={filter}></input>
    )
}

export default MenuInput;