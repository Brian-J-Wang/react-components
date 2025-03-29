import { ReactNode, useEffect } from "react";
import requireContext from "../../utilities/requireContext";
import { RichInputContext } from "./RichInput";

export interface RichInputAttributeProps {
    children: ReactNode,
    /** The name used for filtering. Case-insensitive */
    name: string,
    /** The component to display in the menu when selecting attributes 
     *  @param isSelected whether or not the cursor is focused on the
    */
    menuDisplay: (isSelected: boolean) => ReactNode,
}

/** Wrapper for controlling what shows up in the AttributeMenu. 
 *  Children will be shown if selected and inputState is "selectingValue".
 *  The menuDisplay component will be shown if inputState is "filteringAttribute".
*/
const Attribute: React.FC<RichInputAttributeProps> = (props) => {
    const { cursor, state } = requireContext(RichInputContext);

    useEffect(() => {
        cursor.addToList(props.name);

        return () => {
            cursor.removeFromList(props.name);
        }
    }, [] );
    
    const handleClick = () => {
        cursor.jumpToAttribute(props.name);
        state.setState("menu");
    }

    const handleMouseEnter = () => {
        cursor.jumpToAttribute(props.name);
    }

    const isSelected = cursor.current.name == props.name;
    const isHidden = cursor.getAttribute(props.name)?.hidden ?? true;


    if (state.current == "secondary" && !isHidden) {
        return (
            <div className="flex" onClick={handleClick} onMouseEnter={handleMouseEnter}>
                {props.menuDisplay(isSelected)}
            </div>
        )
    } else if (state.current == "menu" && isSelected) {
        return (
            <>
                {props.children}
            </>
        );
    } else {
        return (<></>)
    }
}

export default Attribute;