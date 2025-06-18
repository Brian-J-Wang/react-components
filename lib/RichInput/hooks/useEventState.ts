import { useRef, useState } from "react";
import { createUID } from "../../utilities/createUID";

type event<T> = {
    id: string,
    from: T | "*",
    to: T | "*",
    fn: () => void
}

export type useEventStateReturn<T> = {
    addStateEffect: (from: T | "*", to: T | "*", fn: () => void) => string,
    removeStateEffect: (id: string) => void;
    state: T,
    setState: (state: T) => void
}

function useEventState<T>( initialState: T): useEventStateReturn<T> {
    const [ _state, _setState ] = useState<T>(initialState);
    const events = useRef<event<T>[]>([]);

    const addStateEffect = (from: T | "*", to: T | "*", fn: () => void) => {
        const id = createUID();
        events.current.push({
            id: id,
            from: from,
            to: to,
            fn: fn
        })

        return id;
    }

    const removeStateEffect = (id: string) => {
        events.current = events.current.filter((event) => event.id != id);
    }

    const setState = (state: T) => {
        const oldState = _state;
        const newState = state;

        if (oldState == newState) {
            return;
        }

        events.current.forEach((event) => {
            if ((event.from == oldState || event.from == "*") && (event.to == newState || event.to == "*")) {
                event.fn();
            }
        });

        _setState(state);
    }

    return {
        addStateEffect,
        removeStateEffect,
        state: _state,
        setState
    }
}

export default useEventState;