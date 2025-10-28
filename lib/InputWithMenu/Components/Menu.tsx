import styles from "../styles/AttributeMenu.module.css";
import RequireContext from "../../utilities/requireContext";
import { InputWithMenuContext } from "../Contexts/inputWithMenuContext";
import { useEffect } from "react";
import BoundingBox from "../../utilities/boundingBox";

type AttributeMenuProps = React.HTMLAttributes<HTMLDivElement> & {
}

const Menu: React.FC<AttributeMenuProps> = ({className, ...props}) => {
    const { setMenuMode, menuInputElement, menuMode, cursor } = RequireContext(InputWithMenuContext);

    useEffect(() => {
        if (menuMode != "hidden" && menuInputElement?.current) {
            menuInputElement.current.focus();
        }
    }, [menuInputElement, menuMode]);

    const handleWithinBound = () => {
        if (menuInputElement?.current) {
            menuInputElement.current.focus();
        }
    }

    const handleOutofBound = () => {
        setMenuMode("hidden")
    }

    return (
        <BoundingBox isActive={menuMode != "hidden"} className={`${menuMode != "hidden" ? className : styles.menu__hidden}`} {...props} tabIndex={-1} onWithinBound={handleWithinBound} onOutOfBound={handleOutofBound}>
            {
                (menuMode == "display") ? 
                cursor.current.content : props.children
            }
        </BoundingBox>
    )
};

export default Menu;
