import React from "react";
import requireContext from "../../../lib/utilities/requireContext";
import { Attribute, AttributeMenu, PrimaryInput, RenderAttributes, RichInput, RichInputContext, SecondaryInput, Submit } from "../../../lib/RichInput";

import styles from "./richInput.module.css";


const HairLengthAttribute = () => {
    const { setAttributeValue } = requireContext(RichInputContext);

    const setValue = (value: string) => () => {
        setAttributeValue(value);
    }

    return (
        <>
            <h1>Hair Length</h1>
            <div className="flex justify-center ">
                <input type="button" value="short" onClick={setValue("short")} className="hover:bg-slate-200 cursor-pointer px-2"/>
                <input type="button" value="medium" onClick={setValue("medium")} className="hover:bg-slate-200 cursor-pointer px-2"/>
                <input type="button" value="long" onClick={setValue("long")} className="hover:bg-slate-200 cursor-pointer px-2"/>
            </div>
        </>
    )
}

const BreedAttribute = () => {
    const { setAttributeValue } = requireContext(RichInputContext);

    const handleClick = () => {
        setAttributeValue("Maine Coon");
    }

    return (
        <input type="button" value="Maine Coon" onClick={handleClick}/>
    )
}

const GenderAttribute = () => {
    const { setAttributeValue } = requireContext(RichInputContext);

    const handleClick = () => {
        setAttributeValue("Maine Coon");
    }

    return (
        <input type="button" value="Male" onClick={handleClick}/>
    )
}

export const RichInputMinimalStyling = () => {
    return (
        <RichInput onSubmit={() => Promise.resolve()}>
            <AttributeMenu className={styles.attributeMenu} data-testid="attributeMenu" activeClass={styles.attributeSelected}>
                <h3 className={styles.attributeMenuTitle}>Select Attribute:</h3>
                <Attribute name={"hairLength"} attributeContent={<HairLengthAttribute/>}>
                    <small className={styles.attribute}>Hair Length</small>
                </Attribute>
                <Attribute name={"breed"} attributeContent={<BreedAttribute/>}>
                    <small className={styles.attribute}>Cat Breed</small>
                </Attribute>
                <Attribute name={"gender"} attributeContent={<GenderAttribute/>}>
                    <small className={styles.attribute}>Gender</small>
                </Attribute>
            </AttributeMenu>
            <div className={styles.inputBox}>
                <SecondaryInput className={styles.secondaryInput} data-testid="secondary-input"/>
                <PrimaryInput className={styles.primaryInput} placeholder="Enter name, or type '/' to filter by attributes" />
                <Submit className="px-2 bg-blue-200">
                    Submit
                </Submit>
            </div>
            <RenderAttributes render={(attribute) => (
                <div>{attribute.key}:{attribute.value}</div>
            )}/>
        </RichInput>
    )
}


export default RichInputMinimalStyling;