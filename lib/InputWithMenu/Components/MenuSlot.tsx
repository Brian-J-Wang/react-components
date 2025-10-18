import { cloneElement, ReactElement, } from "react";
import requireContext from "../../utilities/requireContext"
import menuContext, { MenuItem } from "../Contexts/menuContext"
import { InputWithMenuContext } from "../Contexts/inputWithMenuContext";

type MenuSlotProps = {
    render: (item: MenuItem, isActive: boolean) => ReactElement<React.HTMLAttributes<HTMLElement>>;
}

const MenuSlot: React.FC<MenuSlotProps> = (props) => {
    const { cursor } = requireContext(InputWithMenuContext);
    const { filter, menuItems } = requireContext(menuContext);
    return (
        <>
            {
                menuItems.filter((item) => {
                    return item.id.substring(0, filter.length) == filter;
                }).map((item) => {
                    const element = props.render(item, cursor.current == item)
                    return cloneElement(element, {
                        onMouseEnter: (evt) => {
                            if (element.props.onMouseEnter) {
                                element.props.onMouseEnter(evt);
                            }
                            
                            const index = cursor.array.findIndex((arrItem) => arrItem.id == item.id);
                            cursor.jumpCursor(index);
                        }
                    })
                })
            }
        </>
    )
}

export default MenuSlot