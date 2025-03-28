import { Meta, StoryObj } from "@storybook/react"
import RichInput, { RichInputContext } from "../components/rich-input/RichInput";
import PrimaryInput from "../components/rich-input/PrimaryInput";
import SecondaryInput from "../components/rich-input/SecondaryInput";
import AttributeMenu from "../components/rich-input/AttributeMenu";
import Attribute from "../components/rich-input/Attribute";
import { twMerge } from "tailwind-merge";
import requireContext from "../utilities/requireContext";

const Component = () => {
    return (
        <RichInput onSubmit={() => {}}>
            <AttributeMenu className="border border-neutral-300 rounded mb-1 flex flex-col">
                <HairLengthAttribute/>
                <BreedAttribute/>
                <GenderAttribute/>
            </AttributeMenu>
            <div className="flex flex-row items-center w-full pl-[2px] h-6 text-sm font-semibold border-[1px] border-neutral-300 rounded">
                <SecondaryInput className={"bg-blue-300 text-[10px] h-4 rounded-[10px]"}/>
                <PrimaryInput className="outline-none " placeholder="Enter name, or type '/' to filter by attributes" />
            </div>
        </RichInput>
    )
}

const HairLengthAttribute = () => {
    const { setAttributeValue } = requireContext(RichInputContext);

    const handleClick = () => {
        setAttributeValue("Maine Coon");
    }

    return (
        <Attribute name="hair length" menuDisplay={(isSelected) => {
            return <small className={twMerge("hover:bg-slate-100 cursor-pointer w-full", isSelected ? "bg-slate-100" : "")}>Hair Length</small>
        }
        }>
            <input type="button" value="short" onClick={handleClick}/>
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