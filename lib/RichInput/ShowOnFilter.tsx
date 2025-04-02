import { ReactNode } from "react"
import requireContext from "../utilities/requireContext"
import { RichInputContext } from "./RichInput"

type ShowOnFilterProps = {
    children: ReactNode
}

const ShowOnFilter: React.FC<ShowOnFilterProps> = (props) => {
    const { state } = requireContext(RichInputContext);

    if (state.current == "secondary") {
        return (props.children);
    } else {
        return (<></>);
    }
}

export default ShowOnFilter;