import { PropsWithChildren, useContext } from "react";
import { NavigableMenuContext } from "./NavigableMenu";

type MenuItemProps = PropsWithChildren & Omit<React.ComponentProps<"div">, "onMouseOver"> & {
    name: string,
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const menuContext = useContext(NavigableMenuContext);

    return (
        <div data-menuitem={props.name} onMouseOver={() => { menuContext.handleHover(props.name)}} {...props}>
            { props.children }
        </div>
    )
}

export default MenuItem;