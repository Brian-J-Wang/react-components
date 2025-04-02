import requireContext from "../utilities/requireContext"
import { RichInputContext } from "./RichInput"

type SubmitProps = React.HTMLAttributes<HTMLButtonElement> & { }

const Submit: React.FC<SubmitProps> = ({ onClick, children, ...props }) => {
    const { submit } = requireContext(RichInputContext);

    const handleClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onClick && onClick(evt);
        submit();
    }

    return (
        <button onClick={handleClick} {...props}>
            {children}
        </button>
    )
}

export default Submit