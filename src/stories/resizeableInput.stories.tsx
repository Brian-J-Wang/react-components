import { Meta, StoryObj } from "@storybook/react";
import ResizeableInput from "../components/ResizbleInput/ResizeableInput";

const meta = {
    title: "Components/Resizeable Input",
    component: ResizeableInput,
    parameters: {
        layout: "centered"
    }
} satisfies Meta

export default meta;
export const Primary: StoryObj<typeof meta> = {
    args: {}
}