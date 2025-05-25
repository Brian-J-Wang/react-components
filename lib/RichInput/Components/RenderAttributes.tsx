import { ReactNode } from "react"
import requireContext from "../../utilities/requireContext"
import { RichInputContext } from "./RichInput"

type RenderAttributeProps = {
    render: (key: string, value: any) => ReactNode
}

const RenderAttributes: React.FC<RenderAttributeProps> = (props) => {
    const { attribute } = requireContext(RichInputContext);
    return (
        <>
            {
                attribute.current.map(({key, value}) => {
                    return props.render(key, value);
                })
            }
        </>
    )
} 

export default RenderAttributes;