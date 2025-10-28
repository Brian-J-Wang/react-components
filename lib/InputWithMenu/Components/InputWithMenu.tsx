import { RefObject, useRef, useState } from "react";
import menuContext, { MenuItem } from "../Contexts/menuContext";
import { InputWithMenuContext, validMenuStates } from "../Contexts/inputWithMenuContext";
import { useArrayCursor } from "../Hooks";
import { defaultInputWithMenuConfig, inputWithMenuConfig } from "../config";

type RichInputProps = React.PropsWithChildren & {
    className?: string
    //The boolean represents weather or not the submission passes or not.
    onSubmit: (submission: string) => Promise<boolean>,
    menuItems: MenuItem[],
    config?: inputWithMenuConfig
}

/**
 * Represents the three different input states the user can be in.
 * @param notFocused input isn't selected.
 * @param textInput user is typing the main body of text.
 * @param filteringAttribute user has typed the keyword and is now looking their attribute.
 * @param selectingValue user is setting the value for their attribute.
 */
const InputWithMenu: React.FC<RichInputProps> = ({ menuItems, onSubmit, config = defaultInputWithMenuConfig, ...props }) => {
    const primaryInputElement = useRef<HTMLInputElement>(undefined) as RefObject<HTMLInputElement>;
    const menuInputElement = useRef<HTMLInputElement>(undefined) as RefObject<HTMLInputElement>;
    const [ input, setInput ] = useState<string>("");
    const [ filter, _setFilter ] = useState<string>("");
    const [ menuMode, _setMenuMode ] = useState<validMenuStates>("hidden");

    if (config.requireUnique) {
        const set = new Set();
        menuItems.forEach((item) => {
            if (set.has(item.id)) {
                throw new Error("duplicate menu item");
            }
        })  
    }

    const cursor = useArrayCursor(menuItems, (item) => item.id);

    const submit = () => {
        return onSubmit(input).then((shouldClearInput) => {
            if (shouldClearInput) {
                _setFilter("");
                setInput("");
                _setMenuMode("hidden");
            }
        });
    }

    const setFilter = ( value: string ) => {
        _setFilter(value);

        if (cursor.current.id.substring(0, value.length) != value) {
            const hasShifted = cursor.moveCursor("up", (item) => {
                return item.id.substring(0, value.length) == value;
            });

            if (!hasShifted) {
                cursor.moveCursor("down", (item) => {
                    return item.id.substring(0, value.length) == value;
                });
            }
        } 
    }

    const onArrowUpPress = () => {
        if (menuMode == "select") {
            cursor.moveCursor("down", (item) => {
                return item.id.substring(0, filter.length) == filter;
            });
        } 
    }

    const onArrowDownPress = () => {
        if (menuMode == "select") {
            cursor.moveCursor("up", (item) => {
                return item.id.substring(0, filter.length) == filter;
            });
        }
    }

    const onEnterPress = () => {
        if (menuMode == "select") {
            setMenuMode("display");
        }
    }

    const onBackspacePress = () => {
        if (menuMode == "select") {
            primaryInputElement.current.focus();
        } else {
            setMenuMode("select");
        }
    }

    const onMenuItemClick = (item: MenuItem) => {
        cursor.jumpCursor(cursor.array.findIndex(arrItem => arrItem.id == item.id));
        setMenuMode("display");
    }

    const onMenuItemHover = (item: MenuItem) => {
        cursor.jumpCursor(cursor.array.findIndex(arrItem => arrItem.id == item.id));
    }

    const setMenuMode = (state: validMenuStates) => {
        switch(state) {
            case "hidden":
                _setFilter("");
                _setMenuMode("hidden");
                break;
            case "select":
                _setMenuMode("select");
                break;
            case "display":
                _setMenuMode("display");
                break;
        }
    }

    const onHandles = {
        onArrowDownPress,
        onArrowUpPress,
        onEnterPress,
        onBackspacePress,
        onMenuItemClick,
        onMenuItemHover
    }

    return (
        <InputWithMenuContext.Provider value={{
            input, setInput, submit, primaryInputElement, menuInputElement, onHandles, cursor, menuMode, setMenuMode
        }}>
            <menuContext.Provider value={{filter, setFilter, menuItems}}>
                <div className={props.className} tabIndex={-1}>
                    {props.children}
                </div>
            </menuContext.Provider>
        </InputWithMenuContext.Provider>
    )
}

export default InputWithMenu;