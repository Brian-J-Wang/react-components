import { ReactNode } from "react"
import requireContext from "../../utilities/requireContext"
import { RichInputContext } from "./RichInput"
import { Attribute, AttributesController } from "../Hooks"

type RenderAttributeProps = {
    render: (attribute: Attribute, context: AttributesController) => ReactNode
}

const RenderAttributes: React.FC<RenderAttributeProps> = (props) => {
    const { attribute: attributes } = requireContext(RichInputContext);
    return (
        <>
            {
                attributes.current.map((kvp) => {
                    return props.render(kvp, attributes);
                })
            }
        </>
    )
} 

export default RenderAttributes;