import { PropsWithChildren, useContext } from "react";
import { NavigableMenuContext } from "./NavigableMenuContext";

type MenuItemProps = PropsWithChildren & Omit<React.ComponentProps<"div">, "onMouseOver"> & {
    name: string,
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, ...props}) => {
    const menuContext = useContext(NavigableMenuContext);

    const handleClick = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (onClick) onClick(evt);
        menuContext.handleClick(props.name);
    }

    return (
        <div data-menuitem={props.name} onMouseOver={() => { menuContext.handleHover(props.name)}} onClick={handleClick} {...props}>
            { props.children }
        </div>
    )
}

export default MenuItem;