import { ReactNode } from "react"
import requireContext from "../../utilities/requireContext"
import { RichInputContext } from "./RichInput"

type ShowOnFilterProps = {
    children: ReactNode
}

/** The content that will be rendered when the menu mode is set to secondary */
const ShowOnFilter: React.FC<ShowOnFilterProps> = (props) => {
    const { inputState } = requireContext(RichInputContext);

    if (inputState.state == "menuKey") {
        return (props.children);
    } else {
        return (<></>);
    }
}

export default ShowOnFilter;