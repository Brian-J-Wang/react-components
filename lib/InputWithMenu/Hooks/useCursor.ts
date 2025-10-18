import { useEffect, useRef, useState } from "react";

export type ArrayCursorController<T> = {
    array: T[],
    current: T,
    currentIndex: number,
    shiftCursor: (direction: "up" | "down") => void,
    /** moves the cursor up or down, cursor only updates to the first conditional that passes, otherwise the cursor remains in place.
     * @returns {Boolean} boolean of whether the function call resulted in a change in index
    */
    moveCursor: (direction: "up" | "down", conditional: (item: T, index: number) => boolean) => boolean
    jumpCursor: (index: number) => void,
}

export default function useArrayCursor<T>(value: T[], identifier: (item: T) => unknown): ArrayCursorController<T> {
    const array = useRef<Array<T>>(value);
    const [ index, setIndex ] = useState<number>(0);

    useEffect(() => {
        //clears the attributes if this ever gets unmounted.
        return () => {
            array.current = [];
        }
    }, []);

    //updates the cursor to the new array if there is a matching identifier
    useEffect(() => {
        const itemID = identifier(array.current[index]);

        const newCursorPosition = value.findIndex((item) => {
            return itemID == identifier(item);
        })

        if ( newCursorPosition != -1 ) {
            setIndex(newCursorPosition);
        }
        
    }, [ identifier, index, value ]);

    //moves the cursor up or down to the next non-hidden attribute. Defaults to original cursor if none is found;
    const shiftCursor = (direction: "up" | "down") => {
        if (direction == "up" && index < array.current.length - 1) {
            setIndex(index + 1);
        }

        if (direction == "down" && index > 0) {
            setIndex(index - 1);
        }
    }

    const moveCursor = ( direction: "up" | "down", conditional: (item: T, index: number) => boolean ) => {
        if (direction == "up" && index < array.current.length - 1) {
            for (let i = index + 1; i < array.current.length; i++ ) {
                if (conditional(array.current[i], i)) {
                    setIndex(i);
                    return true;
                }
            }
        }

        if (direction == "down" && index > 0) {
            for (let i = index - 1; i >= 0; i--) {
                if (conditional(array.current[i], i)) {
                    setIndex(i);
                    return true;
                }
            }
        }

        return false;
    }

    const jumpCursor = ( index: number ) => {
        if (withinBounds(index)) {
            setIndex(index);
        }
    }

    const withinBounds = (i: number) => {
        if (i < 0) return false;
        if (i >= array.current.length) return false;
        return true;
    }


    return {
        array: array.current,
        current: array.current[index],
        currentIndex: index,
        shiftCursor,
        moveCursor,
        jumpCursor
    }
}