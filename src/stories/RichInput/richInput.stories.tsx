import { Meta, StoryObj } from "@storybook/react"
import { within, userEvent } from "@storybook/testing-library";
import {expect} from "@storybook/jest";

import styles from "./richInput.module.css";
import RichInputMinimalStyling from "./richInput";

const meta = {
    title: 'Components/Rich Input',
    component: RichInputMinimalStyling,
    args: {},
    parameters: {
        layout: "centered"
    },
    decorators: [
        (Story) => (
            <div className={styles.decorator}>
                <Story/>
            </div>
        )
    ]
} satisfies Meta

export default meta;
type Story = StoryObj<typeof meta>

export const MinimalStyling: Story = {};

export const SecondaryInputOpened: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await userEvent.click(canvas.getByPlaceholderText("Enter name, or type '/' to filter by attributes"));
        await userEvent.keyboard("/");

        expect(canvas.getByText("Select Attribute:")).toBeInTheDocument();
        expect(canvas.getByTestId("secondary-input")).toBeVisible();
    }
}

export const SecondaryInputOpenAndKeyboardTyped: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await userEvent.click(canvas.getByPlaceholderText("Enter name, or type '/' to filter by attributes"));
        await userEvent.keyboard("/");
        await userEvent.keyboard("bre");

        expect(canvas.queryByTestId("attribute-1")).toBeNull();
        expect(canvas.queryByTestId("attribute-2")).toBeInTheDocument();
        expect(canvas.queryByTestId("attribute-3")).toBeNull();
    }
}

export const InputValueWithNoMatch: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await userEvent.click(canvas.getByPlaceholderText("Enter name, or type '/' to filter by attributes"));
        await userEvent.keyboard("/");
        await userEvent.keyboard("{c}{a}{t}{e}{e}");

        expect(canvas.queryByTestId("attribute-1")).toBeNull();
        expect(canvas.queryByTestId("attribute-2")).toBeNull();
        expect(canvas.queryByTestId("attribute-3")).toBeNull();
    }
}

export const OpenAndCloseWithKeyboard: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await userEvent.click(canvas.getByPlaceholderText("Enter name, or type '/' to filter by attributes"));
        await userEvent.keyboard("/");
        await userEvent.keyboard("{Backspace}");
    }
}