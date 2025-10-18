import { Meta, StoryObj } from "@storybook/react"

import styles from "./inputWithMenu.module.css";
import InputWithMenuBasic from "./inputWithMenu";

const meta = {
    title: 'Components/Rich Input',
    component: InputWithMenuBasic,
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