import { useEffect, useRef, useState } from "react";

export interface AttributeObj {
    hidden: boolean,
    name: string,
    onStateChange: (newState: boolean) => void;
}

export type CursorController = {
    attributes: AttributeObj[],
    addToList: (name: string, onStateChange?: (newState: boolean) => void) => void,
    removeFromList: (name: string) => void,
    current: AttributeObj,
    shiftCursor: (direction: "up" | "down") => void,
    jumpToIndex: (index: number) => void,
    jumpToAttribute: (name: string) => void,
    getAttribute: (name: string) => AttributeObj | undefined,
    /** Used to properly move the cursor when input changes */
    filterAttribute: (value: string ) => void
}

export default function useCursor(): CursorController {
    const attributes = useRef<AttributeObj[]>([]);
    const [ cursor, setCursor ] = useState<number>(-1);

    const current = (cursor == -1)
        ? {
            hidden: true,
            name: "undefined",
            onStateChange: () => {}
        } 
        : attributes.current[cursor];

    useEffect(() => {
        //clears the attributes if this ever gets unmounted.
        return () => {
            attributes.current = [];
        }
    }, []);


    const addToList = (name: string, onStateChange?: (newState: boolean) => void) => {
        if (attributes.current.some((value) => value.name  == name)) {
            throw new Error("Attribute already exists");
        }

        if (!onStateChange) {
            onStateChange = () => {}
        }

        const attribute: AttributeObj = {
            hidden: false,
            name: name,
            onStateChange: onStateChange
        }

        attributes.current.push(attribute);

        if (cursor == -1) {
            setCursor(0);
        }
    }

    const removeFromList = (name: string) => {
        let removedIndex = -1;
        attributes.current.filter((value, index) => {
            if (value.name == name) {
                removedIndex == index;
                return false;
            } else {
                return true;
            }
        })

        if (removedIndex == -1) {
            return;
        }

        //moves the cursor to the next, non-hidden attribute. Defaults to -1 if none is found;
        moveToNearestVisibleAttribute();
    }

    //moves the cursor up or down to the next non-hidden attribute. Defaults to original cursor if none is found;
    const shiftCursor = (direction: "up" | "down") => {
        const next = () => {
            return (direction == "up") ? -1 : 1
        }

        for (let i = cursor + next(); withinBounds(i); i = i + next()) {
            if (!attributes.current[i].hidden) {
                setCursor(i);
                break;
            }
        }
    }

    const jumpToIndex = (index: number) => {
        if (withinBounds(index)) setCursor(index);
    }

    const jumpToAttribute = (name: string) => {
        attributes.current.forEach((attribute, index) => {
            if (attribute.name == name) setCursor(index);
        })
    }

    const withinBounds = (i: number) => {
        if (i < 0) return false;
        if (i >= attributes.current.length) return false;
        return true;
    }

    const getAttribute = (name: string) => {
        return attributes.current.find((attribute) => attribute.name == name);
    }

    const filterAttribute = (input: string) => {
        attributes.current = attributes.current.map((attribute) => {
            attribute.hidden = attribute.name.slice(0, input.length) != input;
            attribute.onStateChange(attribute.hidden);

            return attribute;
        });

        moveToNearestVisibleAttribute();
    }

    const moveToNearestVisibleAttribute = () => {
        if (cursor != -1 && !attributes.current[cursor].hidden) {
            return;
        }

        const queue = [ cursor - 1, cursor + 1];
        const visited = [ cursor ];

        while (true) {
            const sample = queue.shift();

            //we reached the end of all cursors and no visible attributes were found;
            if (sample == undefined) {
                setCursor( -1 );
                return;
            }

            if (!withinBounds(sample)) {
                continue;
            }

            if (attributes.current[sample].hidden) {
                if (!visited.includes(sample + 1) && !queue.includes(sample + 1)) {
                    queue.push(sample + 1);
                }
                if (!visited.includes(sample - 1) && !queue.includes(sample - 1)) {
                    queue.push(sample - 1);
                }
                visited.push(sample);
            } else {
                console.log(sample);
                setCursor( sample );
                return;
            }
        }
    }

    return {
        attributes: attributes.current,
        addToList,
        removeFromList,
        current,
        shiftCursor: shiftCursor,
        jumpToIndex,
        jumpToAttribute,
        getAttribute,
        filterAttribute
    }
}