import { Meta, StoryObj } from "@storybook/react"
import RichInput, { RichInputContext } from "../components/rich-input/RichInput";
import PrimaryInput from "../components/rich-input/PrimaryInput";
import SecondaryInput from "../components/rich-input/SecondaryInput";
import AttributeMenu from "../components/rich-input/AttributeMenu";
import Attribute from "../components/rich-input/Attribute";
import { twMerge } from "tailwind-merge";
import requireContext from "../utilities/requireContext";
import Submit from "../components/rich-input/Submit";
import ShowOnFilter from "../components/rich-input/ShowOnFilter";

const Component = () => {
    return (
        <RichInput onSubmit={() => Promise.resolve()}>
            <AttributeMenu className="border border-neutral-300 rounded mb-1 flex flex-col">
                <ShowOnFilter>
                    <h3>Select Attribute:</h3>
                </ShowOnFilter>
                <HairLengthAttribute/>
                <BreedAttribute/>
                <GenderAttribute/>
            </AttributeMenu>
            <div className="flex flex-row items-center w-full pl-[2px] h-6 text-sm font-semibold border-[1px] border-neutral-300 rounded">
                <SecondaryInput className={"bg-blue-300 text-[10px] h-4 rounded-[10px]"}/>
                <PrimaryInput className="outline-none " placeholder="Enter name, or type '/' to filter by attributes" />
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
        <Attribute name="hair length" menuDisplay={menuDisplay}>
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
        <Attribute name="breed" menuDisplay={(isSelected) => {
            return <small className={twMerge("hover:bg-slate-100 cursor-pointer w-full", isSelected ? "bg-slate-100" : "")}>Cat Breed</small>
        }}>
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
        <Attribute name="gender" menuDisplay={(isSelected) => {
            return <small className={twMerge("hover:bg-slate-100 cursor-pointer w-full", isSelected ? "bg-slate-100" : "")}>Gender</small>
        }}>
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
            <div className="w-[480px] h-[240px] flex flex-col justify-end">
                <Story/>
            </div>
        )
    ]
} satisfies Meta

export default meta;

export const Primary: StoryObj<typeof meta> = {

}