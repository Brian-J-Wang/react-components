import { PropsWithChildren, useContext } from "react";
import { NavigableMenuContext } from "./NavigableMenu";

type MenuItemProps = PropsWithChildren & {
    className?: string,
    name: string,
    id?: string
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const menuContext = useContext(NavigableMenuContext);

    return (
        <div className={props.className} data-menuitem={props.name} onMouseOver={() => { menuContext.handleHover(props.name)}}>
            { props.children }
        </div>
    )
}

export default MenuItem;