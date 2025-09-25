import { Meta, StoryObj } from "@storybook/react";
import NavigableMenu from "../../../lib/NavigableMenu/NavigableMenu";
import MenuItem from "../../../lib/NavigableMenu/MenuItem";
import FilterableList from "../../../lib/FilterableList/FilterableList"

import styles from "./navigation.module.css";
import { useState } from "react";

const Component = () => {
    const [ value, setValue ] = useState<string>("");
    const [ focus, setFocus ] = useState<boolean>(false);

    return (
        <div>
            <NavigableMenu activeClass={styles.activeClass} active={focus}>
                <FilterableList filter={value}>
                    <MenuItem className={styles.menuItem} name="something" data-filterable="something">
                    Something
                    </MenuItem>
                    <MenuItem className={styles.menuItem} name="somewhere" data-filterable="somewhere">
                        Somewhere
                    </MenuItem>
                    <MenuItem className={styles.menuItem} name="somehow" data-filterable="somehow">
                        Somehow
                    </MenuItem>
                    <MenuItem className={styles.menuItem} name="nothing" data-filterable="nothing">
                        Nothing
                    </MenuItem>
                    <MenuItem className={styles.menuItem} name="anything" data-filterable="anything">
                        Anything
                    </MenuItem>
                </FilterableList>
            </NavigableMenu>

            <input type="text" onChange={(evt) => {
                setValue(evt.target.value);
            }} onFocus={() => {
                setFocus(true);
            }} onBlur={() => {
                setFocus(false);
            }}/>
        </div>
    )
}

const meta = {
    title: "Components/Navigable",
    component: Component,
    parameters: {
        layout: "centered"
    }
} satisfies Meta;

export default meta;
export const Primary: StoryObj<typeof meta> = {
    args: {}
}