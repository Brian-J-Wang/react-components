import { ReactNode, useEffect } from "react";
import requireContext from "../utilities/requireContext";
import { RichInputContext } from "./RichInput";

type AttributeProps = React.HTMLAttributes<HTMLDivElement> & {
    name: string,
    filterDisplay: (isSelected: boolean) => ReactNode
}

/** Wrapper for controlling what shows up in the AttributeMenu. 
 *  Children will be shown if selected and inputState is "selectingValue".
 *  The menuDisplay component will be shown if inputState is "filteringAttribute".
*/
const Attribute: React.FC<AttributeProps> = ({ onClick, onMouseEnter, ...props}) => {
    const { cursor, state } = requireContext(RichInputContext);

    useEffect(() => {
        cursor.addToList(props.name);

        return () => {
            cursor.removeFromList(props.name);
        }
    }, []);
    
    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        cursor.jumpToAttribute(props.name);
        state.setState("menu");
        onClick && onClick(event);
    }

    const handleMouseEnter = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        cursor.jumpToAttribute(props.name);
        onMouseEnter && onMouseEnter(evt);
    }

    const isSelected = cursor.current.name == props.name;
    const isHidden = cursor.getAttribute(props.name)?.hidden ?? true;
    if (state.current == "secondary" && !isHidden) {
        return (
            <div className="flex" onClick={handleClick} onMouseEnter={handleMouseEnter} {...props}>
                {props.filterDisplay(isSelected)}
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