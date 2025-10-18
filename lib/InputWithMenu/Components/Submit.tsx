import requireContext from "../../utilities/requireContext"
import { InputWithMenuContext } from "../Contexts/inputWithMenuContext";

type SubmitProps = React.HTMLAttributes<HTMLButtonElement> & { }

const Submit: React.FC<SubmitProps> = ({ onClick, children, ...props }) => {
    const { submit } = requireContext(InputWithMenuContext);

    const handleClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (onClick) onClick(evt);
        submit();
    }

    return (
        <button onClick={handleClick} {...props}>
            {children}
        </button>
    )
}

export default Submit