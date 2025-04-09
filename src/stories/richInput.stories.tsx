import React from "react";
import { Meta, StoryObj } from "@storybook/react"
import { twMerge } from "tailwind-merge";
import { within, userEvent } from "@storybook/testing-library";
import {expect} from "@storybook/jest";
import { Attribute, AttributeMenu, PrimaryInput, RichInput, RichInputContext, SecondaryInput, ShowOnFilter, Submit } from "../../lib/RichInput";
import requireContext from "../../lib/utilities/requireContext";

const Component = () => {
    return (
        <RichInput onSubmit={() => Promise.resolve()}>
            <AttributeMenu className="border border-neutral-300 rounded mb-1 flex flex-col">
                <ShowOnFilter>
                    <h3>Select Attribute:</h3>
                </ShowOnFilter>
                <HairLengthAttribute />
                <BreedAttribute />
                <GenderAttribute />
            </AttributeMenu>
            <div className="flex w-full h-6">
                <SecondaryInput className={"bg-blue-300 text-[10px] h-4 rounded-[10px]"} data-testid="secondary-input"/>
                <PrimaryInput className="outline-none w-full" placeholder="Enter name, or type '/' to filter by attributes" />
                <Submit className="px-2 bg-blue-200">
                    Submit
                </Submit>
            </div>
            <AttributeBar/>
        </RichInput>
    )
}

const HairLengthAttribute = () => {
    const { setAttributeValue } = requireContext(RichInputContext);

    const setValue = (value: string) => () => {
        setAttributeValue(value);
    }

    const menuDisplay = (isSelected: boolean) => {
        return <small className={twMerge("hover:bg-slate-100 cursor-pointer w-full", isSelected ? "bg-slate-100" : "")}>Hair Length</small>
    }

    return (
        <Attribute name="hair length" filterDisplay={menuDisplay} data-testid="attribute-1">
            <h1>Hair Length</h1>
            <div className="flex justify-center ">
                <input type="button" value="short" onClick={setValue("short")} className="hover:bg-slate-200 cursor-pointer px-2"/>
                <input type="button" value="medium" onClick={setValue("medium")} className="hover:bg-slate-200 cursor-pointer px-2"/>
                <input type="button" value="long" onClick={setValue("long")} className="hover:bg-slate-200 cursor-pointer px-2"/>
            </div>
        </Attribute>
    )
}

const BreedAttribute = () => {
    const { setAttributeValue } = requireContext(RichInputContext);

    const handleClick = () => {
        setAttributeValue("Maine Coon");
    }

    return (
        <Attribute name="breed" filterDisplay={(isSelected) => {
            return <small className={twMerge("hover:bg-slate-100 cursor-pointer w-full", isSelected ? "bg-slate-100" : "")}>Cat Breed</small>
        }} data-testid="attribute-2">
            <input type="button" value="Maine Coon" onClick={handleClick}/>
        </Attribute>
    )
}

const GenderAttribute = () => {
    const { setAttributeValue } = requireContext(RichInputContext);

    const handleClick = () => {
        setAttributeValue("Maine Coon");
    }

    return (
        <Attribute name="gender" filterDisplay={(isSelected) => {
            return <small className={twMerge("hover:bg-slate-100 cursor-pointer w-full", isSelected ? "bg-slate-100" : "")}>Gender</small>
        }} data-testid="attribute-3">
            <input type="button" value="Male" onClick={handleClick}/>
        </Attribute>
    )
}

const AttributeBar = () => {
    const { attribute } = requireContext(RichInputContext);

    return (
        <div className="flex">
            { attribute.current.map((attribute) => {
                return <div className="text-[8px] text-nowrap bg-blue-300 rounded px-1">{attribute.key}:{attribute.value}</div>
            })}
        </div>
    )
}

const meta = {
    title: 'Components/RichInput',
    component: Component,
    args: {},
    parameters: {
        layout: "centered"
    },
    decorators: [
        (Story) => (
            <div className="w-[520px] h-[240px] flex flex-col justify-end">
                <Story/>
            </div>
        )
    ]
} satisfies Meta

export default meta;
type Story = StoryObj<typeof meta>

export const Render: Story = {};

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
