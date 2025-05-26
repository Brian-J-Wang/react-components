import { ReactNode } from "react"
import requireContext from "../../utilities/requireContext"
import { RichInputContext } from "./RichInput"
import { Attribute, AttributesController } from "../Hooks"

type RenderAttributeProps = {
    render: (attribute: Attribute, context: AttributesController) => ReactNode
}

const RenderAttributes: React.FC<RenderAttributeProps> = (props) => {
    const { attribute: attributeController } = requireContext(RichInputContext);
    return (
        <>
            {
                attributeController.current.map((attribute) => {
                    return props.render(attribute, attributeController);
                })
            }
        </>
    )
} 

export default RenderAttributes;