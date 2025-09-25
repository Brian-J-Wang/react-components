import requireContext from "../../utilities/requireContext"
import { RichInputContext } from "./RichInput"

type SubmitProps = React.HTMLAttributes<HTMLButtonElement> & { }

const Submit: React.FC<SubmitProps> = ({ onClick, children, ...props }) => {
    const { submit, primaryInput } = requireContext(RichInputContext);

    const handleClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (onClick) onClick(evt);
        submit(primaryInput.current.innerText);
    }

    return (
        <button onClick={handleClick} {...props}>
            {children}
        </button>
    )
}

export default Submit