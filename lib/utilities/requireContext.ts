import { useContext } from "react";

/** Forces context to be available in component tree or an error will be thrown. */
function RequireContext<T>(context: React.Context<T>) {
    const result = useContext(context);

    if (result == undefined) {
        throw new Error("Context not found");
    } else {
        return result;
    }
}

export default RequireContext;