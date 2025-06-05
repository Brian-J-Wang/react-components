import { Meta, StoryObj } from "@storybook/react";
import { ResizeableInput } from "../../../lib/ResizbleInput";

import styles from "./resizeableInput.module.css";

const ResizeableInputStory = () => {
    return <ResizeableInput className={`${styles.main}`} onEnterPressed={() => {
        console.log("here");
    }}/>
}

const meta = {
    title: "Components/Resizeable Input",
    component: ResizeableInputStory,
    parameters: {
        layout: "centered"
    }
} satisfies Meta

export default meta;
export const Primary: StoryObj<typeof meta> = {
    args: {}
}