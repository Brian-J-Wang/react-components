import styles from "../styles/AttributeMenu.module.css";
import RequireContext from "../../utilities/requireContext";
import { InputWithMenuContext } from "../Contexts/inputWithMenuContext";
import { useEffect } from "react";

type AttributeMenuProps = React.HTMLAttributes<HTMLDivElement> & {
}

const Menu: React.FC<AttributeMenuProps> = ({className, onClick, ...props}) => {
    const { menuVisible, menuInputElement, menuMode, cursor } = RequireContext(InputWithMenuContext);

    useEffect(() => {
        if (menuVisible && menuInputElement?.current) {
            menuInputElement.current.focus();
        }
    }, [menuInputElement, menuVisible])

    const handleMouseDown = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (onClick) onClick(evt);

        if ((evt.target as HTMLElement).tagName != "INPUT") {
            evt.preventDefault();
        }
        //prevent default might stop the menuInput from losing focus
    }

    return (
        <div className={`${menuVisible ? className : styles.menu__hidden}`} onMouseDown={handleMouseDown} {...props} tabIndex={-1}>
            {
                (menuMode == "display") ? 
                cursor.current.content : props.children
            }
        </div>
    )
};

export default Menu;
