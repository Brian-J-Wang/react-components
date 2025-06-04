import { Meta, StoryObj } from "@storybook/react";
import { ResizeableInput } from "../../../lib/ResizbleInput";


const ResizeableInputStory = () => {
    return <ResizeableInput className=""/>
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