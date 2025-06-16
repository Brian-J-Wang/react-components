import { useRef, useState } from "react";

type event<T> = {
    from: T | "*",
    to: T | "*",
    fn: () => void
}

function useEventState<T>( initialState: T) {
    const [ _state, _setState ] = useState<T>(initialState);
    const events = useRef<event<T>[]>([]);

    const addStateEffect = (from: T | "*", to: T | "*", fn: () => void) => {
        events.current.push({
            from: from,
            to: to,
            fn: fn
        })
    }

    const setState = (state: T) => {
        const oldState = _state;
        const newState = state;

        events.current.forEach((event) => {
            if ((event.from == oldState || event.from == "*") && (event.to == newState || event.to == "*")) {
                event.fn();
            }
        })

        _setState(state);
    }

    return {
        addStateEffect,
        state: _state,
        setState
    }
}

export default useEventState;