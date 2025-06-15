import { ReactNode, useEffect, useState } from "react";
import requireContext from "../../utilities/requireContext";
import { RichInputContext } from "./RichInput";
type AttributeProps = React.HTMLAttributes<HTMLDivElement> & {
    name: string,
    filterDisplay: (isSelected: boolean) => ReactNode
}

/** Wrapper for controlling what shows up in the AttributeMenu. 
 *  Children will be shown if selected and inputState is "selectingValue".
 *  The menuDisplay component will be shown if inputState is "filteringAttribute".
*/
const Attribute: React.FC<AttributeProps> = ({ onClick, onMouseEnter, filterDisplay, ...props}) => {
    const { cursor, inputState } = requireContext(RichInputContext);
    const [hidden, setHidden] = useState<boolean>(false);

    useEffect(() => {
        cursor.addToList(props.name, (newValue => {
             setHidden(newValue);
        }))

        return () => {
            cursor.removeFromList(props.name);
        }
    }, []);

    const isSelected = cursor.current.name == props.name;
    if (inputState.menuState == "key" && !hidden) {
        return (
            <AttributeKeyDisplay attributeName={props.name} filterDisplay={filterDisplay} onClick={onClick} onMouseEnter={onMouseEnter} {...props}/>
        )
    } else if (inputState.menuState == "value" && isSelected) {
        return (
            <>
                {props.children}
            </>
        );
    } else {
        return (<></>)
    }
}


type AttributeKeyDisplayType = {
    attributeName: string,
    filterDisplay: (isSelected: boolean) => ReactNode,
    onClick: React.MouseEventHandler<HTMLDivElement> | undefined,
    onMouseEnter: React.MouseEventHandler<HTMLDivElement> | undefined
}
const AttributeKeyDisplay: React.FC<AttributeKeyDisplayType> = ({ onClick, onMouseEnter, filterDisplay, ...props}) => {
    const { cursor, inputState } = requireContext(RichInputContext);

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        cursor.jumpToAttribute(props.attributeName);
        inputState.setMenuState("value");
        onClick && onClick(event);
    }

    const handleMouseEnter = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        cursor.jumpToAttribute(props.attributeName);
        onMouseEnter && onMouseEnter(evt);
    }

    return (
        <div className="flex" onClick={handleClick} onMouseEnter={handleMouseEnter} {...props}>
            {filterDisplay(cursor.current.name == props.attributeName)}
        </div>
    )
}

export default Attribute;