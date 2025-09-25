import { ReactNode } from "react";
import requireContext from "../../utilities/requireContext";
import { RichInputContext } from "./RichInput";
import MenuItem from "../../NavigableMenu/MenuItem";
type AttributeProps = React.HTMLAttributes<HTMLDivElement> & {
    name: string,
    attributeContent: ReactNode
}

/** Wrapper for controlling what shows up in the AttributeMenu. 
 *  Children will be shown if selected and inputState is "selectingValue".
 *  The menuDisplay component will be shown if inputState is "filteringAttribute".
*/
const Attribute: React.FC<AttributeProps> = ({ attributeContent, ...props}) => {
    const { setActiveAttribute } = requireContext(RichInputContext);

    const handleClick = () => {
        setActiveAttribute(attributeContent);
    }

    return (
        <MenuItem name={props.name} onClick={handleClick}>
            {props.children}
        </MenuItem>
    )
}

export default Attribute;