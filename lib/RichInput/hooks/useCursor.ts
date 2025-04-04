import { useEffect, useRef, useState } from "react";

interface AttributeObj {
    hidden: boolean,
    name: string
}

export type CursorController = {
    attributes: AttributeObj[],
    addToList: (name: string) => void,
    removeFromList: (name: string) => void,
    current: AttributeObj,
    move: (direction: "up" | "down") => void,
    jumpToIndex: (index: number) => void,
    jumpToAttribute: (name: string) => void,
    getAttribute: (name: string) => AttributeObj | undefined
}

export default function useCursor() {
    const attributes = useRef<AttributeObj[]>([]);
    const [ cursor, setCursor ] = useState<number>(-1);

    const addToList = (name: string) => {
        if (attributes.current.some((value) => value.name  == name)) {
            throw new Error("Attribute already exists");
        }

        const attribute: AttributeObj = {
            hidden: false,
            name: name
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
        let newCursor = -1;
        const queue = [removedIndex];
        const visited = new Set<number>();

        while (queue.length != 0) {
            const index = queue.shift() ?? -1;
            visited.add(index);

            //index is out of bounds of the cursor
            if (index > attributes.current.length - 1 || index < 0) {
                return;
            }

            if (attributes.current[index].hidden) {
                //adds surrounding indices to the queue and return;
                if (!visited.has(index - 1)) queue.push(index - 1);
                if (!visited.has(index + 1)) queue.push(index + 1);
                return;
            } else {
                newCursor = index;
                break;
            }
        }

        setCursor(newCursor);
    }

    const current = (cursor == -1)
        ? {
            hidden: true,
            name: "undefined"
        } 
        : attributes.current[cursor];

    //moves the cursor up or down to the next non-hidden attribute. Defaults to original cursor if none is found;
    const move = (direction: "up" | "down") => {
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

    useEffect(() => {
        console.log(cursor);
    }, [cursor]);

    /** called whenever the content of the attributes has changed */
    const updateCursor = () => {

        //moves the cursor to the nearest non-hidden attribute if it's original value was -1;
        if (cursor == -1) {
            const newCursor = attributes.current.findIndex((attribute) => !attribute.hidden);
            if (newCursor) setCursor(newCursor);
            return;
        };

        
        //moves the cursor if the current focus item has been hidden to the nearest one.
        if (attributes.current[cursor].hidden) {
            let newCursor = -1;
            const queue = [cursor + 1, cursor - 1];
            const visited: number[] = [cursor];

            while (queue.length != 0) {
                const current = queue.shift();
                if (current == undefined) return;
                if (current >= attributes.current.length || current < 0) continue;
                if (attributes.current[current].hidden) {
                    if (!visited.includes(current + 1) && !queue.includes(current + 1)) {
                        queue.push(current + 1);
                    }
                    if (!visited.includes(current - 1) && !queue.includes(current - 1)) {
                        queue.push(current - 1);
                    }
                    visited.push(current);
                } else {
                    newCursor = current;
                    break;
                }
            }

            setCursor(newCursor);
        }
    }

    return {
        updateCursor,
        attributes: attributes.current,
        addToList,
        removeFromList,
        current,
        move,
        jumpToIndex,
        jumpToAttribute,
        getAttribute
    }
}