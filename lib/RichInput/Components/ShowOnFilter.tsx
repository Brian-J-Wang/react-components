import { ReactNode } from "react"
import requireContext from "../../utilities/requireContext"
import { RichInputContext } from "./RichInput"

type ShowOnFilterProps = {
    children: ReactNode
}

/** The content that will be rendered when the menu mode is set to secondary */
const ShowOnFilter: React.FC<ShowOnFilterProps> = (props) => {
    const { state } = requireContext(RichInputContext);

    if (state.current == "secondary") {
        return (props.children);
    } else {
        return (<></>);
    }
}

export default ShowOnFilter;