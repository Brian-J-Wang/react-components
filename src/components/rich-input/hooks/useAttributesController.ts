import { useState } from "react";

type Attribute = {
    key: string,
    value: any
}

export type AttributesController = {
    current: Attribute[];
    add: (attribute: Attribute) => void,
    remove: (key: string) => void,
    clear: () => void
}

export default function useAttributes(): AttributesController {
    const [ attributes, setAttributes ] = useState<Attribute[]>([]);

    const addAttribute = (input: Attribute) => {
        let overriddenAttribute = false;
        const newAttributes = attributes.map((attribute) => {
            if (attribute.key == input.key) {
                overriddenAttribute = true;
                return input;
            } else {
                return attribute;
            }
        })

        if (!overriddenAttribute) {
            setAttributes([ ...newAttributes, input ]);
        } else {
            setAttributes( newAttributes );
        }

    }

    const removeAttribute = (key: string) => {
        const newAttributes = attributes.filter((attribute) => attribute.key != key);

        setAttributes( newAttributes );
    }

    /** resets input and any attributes */
    const clear = () => {
        setAttributes([]);
    }

    return {
        current: attributes,
        add: addAttribute,
        remove: removeAttribute,
        clear
    }
}