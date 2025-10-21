import { ChangeEvent } from "react";
import RequireContext from "../../utilities/requireContext";
import menuContext from "../Contexts/menuContext";

import styles from "../styles/MenuInput.module.css";
import { InputWithMenuContext } from "../Contexts/inputWithMenuContext";

type MenuInputProps = React.HTMLAttributes<HTMLInputElement> & {}

/** Handles the rendering of the input when inputing attributes */
export const MenuInput: React.FC<MenuInputProps> = ({className, ...props}) => {
    const { menuInputElement, onHandles } = RequireContext(InputWithMenuContext);
    const { filter, setFilter } = RequireContext(menuContext);

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setFilter(evt.target.value);
    }

    const handleKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>) => {
        if (evt.key == "Tab") {
            evt.preventDefault();
        }
        
        if (evt.key == "Backspace") {
            if ((evt.target as HTMLInputElement).value == "") {
                onHandles.onBackspacePress();
            }
        }

        if (evt.key == "Enter") {
            onHandles.onEnterPress();
        }

        if (evt.key == "ArrowUp") {
            evt.preventDefault();
            onHandles.onArrowUpPress();
        } else if (evt.key == "ArrowDown") {
            evt.preventDefault();
            onHandles.onArrowDownPress();
        }
    }

    return (
        <input ref={menuInputElement} type="text" className={`${styles['menu-input']} ${className}`} {...props} onKeyDown={handleKeyDown} onChange={handleChange} value={filter}></input>
    )
}

export default MenuInput;